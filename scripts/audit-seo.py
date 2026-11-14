"""Read-only sitemap SEO crawl. Usage: python3 scripts/audit-seo.py [base URL]."""
import concurrent.futures
from html.parser import HTMLParser
import json
import os
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://fragbasic.fun").rstrip("/")
CANONICAL = os.environ.get("AUDIT_CANONICAL_BASE", BASE).rstrip("/")


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.titles = []
        self.h1_count = 0
        self.description = []
        self.canonical = []
        self.robots = []
        self.missing_alt = 0
        self.json_ld = []
        self.capture = None
        self.buffer = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self.h1_count += 1
        if tag == "title" or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture = tag
            self.buffer = ""
        if tag == "meta":
            name = attrs.get("name", "").lower()
            if name == "description":
                self.description.append(attrs.get("content", ""))
            if name in ("robots", "googlebot"):
                self.robots.append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))
        if tag == "img" and "alt" not in attrs:
            self.missing_alt += 1

    def handle_data(self, data):
        if self.capture:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == self.capture:
            (self.titles if tag == "title" else self.json_ld).append(self.buffer)
            self.capture = None


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "FragBasic-SEO-Audit/1.0"})
    with urllib.request.urlopen(request, timeout=40) as response:
        return response.status, response.url, response.read().decode("utf-8")


def inspect(url):
    try:
        status, final, html = fetch(url.replace(CANONICAL, BASE, 1))
        page = Page()
        page.feed(html)
        issues = []
        if status != 200:
            issues.append(f"HTTP {status}")
        if len(page.titles) != 1 or not page.titles[0].strip():
            issues.append("missing or multiple titles")
        if len(page.description) != 1 or not page.description[0].strip():
            issues.append("missing or multiple descriptions")
        if len(page.canonical) != 1 or page.canonical[0].rstrip("/") != url.rstrip("/"):
            issues.append("missing or mismatched canonical")
        if page.h1_count != 1:
            issues.append(f"{page.h1_count} H1 headings")
        if any("noindex" in value.lower() for value in page.robots):
            issues.append("sitemap URL is noindex")
        if page.missing_alt:
            issues.append(f"{page.missing_alt} images without alt")
        for value in page.json_ld:
            try:
                json.loads(value)
            except ValueError:
                issues.append("invalid JSON-LD")
        return {"url": url, "status": status, "final_url": final, "title": page.titles,
                "description": page.description, "canonical": page.canonical,
                "h1_count": page.h1_count, "json_ld_count": len(page.json_ld), "issues": issues}
    except Exception as error:
        return {"url": url, "issues": [str(error)]}


if __name__ == "__main__":
    _, _, xml = fetch(BASE + "/sitemap.xml")
    root = ET.fromstring(xml)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [element.text for element in root.findall("s:url/s:loc", ns)]
    # Refuse to crawl unrelated origins listed in an unexpected sitemap.
    from urllib.parse import urlsplit
    if any(urlsplit(url).netloc != urlsplit(CANONICAL).netloc for url in urls):
        raise ValueError("Sitemap contains another host; inspect it before crawling")
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(inspect, urls))
    duplicates = {}
    for field in ("title", "description"):
        seen = {}
        for page in pages:
            for value in page.get(field, []):
                seen.setdefault(value, []).append(page["url"])
        duplicates[field] = {value: items for value, items in seen.items() if len(items) > 1}
    print(json.dumps({"base": BASE, "pages_checked": len(pages),
                      "pages_with_issues": sum(bool(page["issues"]) for page in pages),
                      "duplicates": duplicates, "pages": pages}, indent=2))
    sys.exit(1 if any(page["issues"] for page in pages) or any(duplicates.values()) else 0)

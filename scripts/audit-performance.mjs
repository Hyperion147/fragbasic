import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3100';
const output = process.env.AUDIT_OUTPUT_DIR ?? 'lighthouse-results';
await mkdir(output, { recursive: true });
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
try {
  const summaries = [];
  for (const [name, path] of [['home', '/'], ['mousepads', '/mousepads'], ['comparison', '/mousepads/compare/universal']]) {
    const result = await lighthouse(new URL(path, base).href, { port: chrome.port, output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], formFactor: 'mobile' });
    if (!result) throw new Error('Lighthouse did not return a report');
    await writeFile(`${output}/${name}.json`, result.report[0]);
    await writeFile(`${output}/${name}.html`, result.report[1]);
    const audits = result.lhr.audits;
    summaries.push({ route: path, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round((value.score ?? 0) * 100)])),
      metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index'].map((key) => [key, audits[key]?.numericValue])),
      warnings: result.lhr.runWarnings });
  }
  await writeFile(`${output}/summary.json`, JSON.stringify({ base, measuredAt: new Date().toISOString(), environment: 'Lighthouse simulated mobile lab run; not field Core Web Vitals', pages: summaries }, null, 2));
  console.log(JSON.stringify(summaries, null, 2));
} finally { await chrome.kill(); }

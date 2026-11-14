import Link from "next/link";

export function EditorialNote({ updatedAt, createdAt, tested = false, confidence }: { updatedAt?: string; createdAt?: string; tested?: boolean; confidence?: string }) {
  const added = createdAt && !Number.isNaN(Date.parse(createdAt)) ? new Date(createdAt) : undefined;
  const date = updatedAt && !Number.isNaN(Date.parse(updatedAt)) ? new Date(updatedAt) : undefined;
  return (
    <div className="mt-4 space-y-1 text-sm leading-6 text-muted-foreground">
      <p>By <Link href="/editorial-policy#who" className="underline underline-offset-4">FragBasic</Link> · {tested ? "Personal testing recorded" : "Source-based editorial profile"}{confidence ? ` · ${confidence} confidence` : ""}</p>
      {added && <p>Record added <time dateTime={added.toISOString()}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" }).format(added)}</time>.</p>}
      {date && <p>Record updated <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" }).format(date)}</time>. This is the catalog edit date, not a claim of new testing.</p>}
      <Link href="/editorial-policy" className="inline-block underline underline-offset-4">Methodology, sources and disclosures</Link>
    </div>
  );
}

type JsonLdProps = {
  data: Record<string, unknown> | null;
};

export function JsonLd({ data }: JsonLdProps) {
  if (data === null) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

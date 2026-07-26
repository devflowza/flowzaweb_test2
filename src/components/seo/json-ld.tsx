interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders a schema.org JSON-LD graph. `<` is escaped to prevent script breakout. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}

type FaqItem = {
  q: string;
  a: string;
};

export function AiDefinition({
  heading,
  definition,
  bottomLine,
}: {
  heading: string;
  definition: string;
  bottomLine: string;
}) {
  return (
    <section aria-label={heading} className="soft-panel p-4 sm:p-5">
      <h2 className="section-title">{heading}</h2>
      <p className="body-copy mt-3 max-w-3xl">{definition}</p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground">
        <span className="font-semibold">Bottom line: </span>
        {bottomLine}
      </p>
    </section>
  );
}

export function AiSpecTable({
  heading,
  rows,
}: {
  heading: string;
  rows: Array<{ feature: string; value: string }>;
}) {
  return (
    <section aria-label={heading} className="soft-panel p-4 sm:p-5">
      <h2 className="section-title">{heading}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="border-b border-border px-3 py-2">
                Feature
              </th>
              <th scope="col" className="border-b border-border px-3 py-2">
                {heading}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="align-top">
                <th
                  scope="row"
                  className="border-b border-border/60 px-3 py-2 font-semibold text-foreground"
                >
                  {row.feature}
                </th>
                <td className="border-b border-border/60 px-3 py-2 leading-6 text-muted-foreground">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function AiFaq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-label="Frequently asked questions" className="soft-panel p-4 sm:p-5">
      <h2 className="section-title">Frequently asked questions</h2>
      <div className="mt-4 space-y-5">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="text-base font-semibold leading-6 text-foreground">
              {item.q}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from "react";

type Cell = { mark: "yes" | "partial" | "no"; label: string };

const columns = [
  { key: "custom", label: "keyyard/bedrock-build", highlight: true },
  { key: "ms", label: "Microsoft Samples" },
  { key: "community", label: "Community Templates" },
  { key: "raw", label: "Raw Setup" },
];

const rows: { feature: string; cells: Record<string, Cell> }[] = [
  {
    feature: "Hot reload",
    cells: {
      custom: { mark: "yes", label: "Built-in --watch" },
      ms: { mark: "yes", label: "Gulp watcher to com.mojang" },
      community: { mark: "partial", label: "Template-dependent" },
      raw: { mark: "no", label: "DIY" },
    },
  },
  {
    feature: ".mcaddon packaging",
    cells: {
      custom: { mark: "yes", label: "One command" },
      ms: { mark: "no", label: "Not included" },
      community: { mark: "partial", label: "Sometimes scripted" },
      raw: { mark: "no", label: "Zip by hand" },
    },
  },
  {
    feature: "TypeScript",
    cells: {
      custom: { mark: "yes", label: "Strict, pre-wired" },
      ms: { mark: "partial", label: "Some samples only" },
      community: { mark: "partial", label: "Varies" },
      raw: { mark: "no", label: "Set it up yourself" },
    },
  },
  {
    feature: "Manifest UUIDs handled",
    cells: {
      custom: { mark: "yes", label: "Auto-generated" },
      ms: { mark: "no", label: "Copy-paste risk" },
      community: { mark: "partial", label: "Per template" },
      raw: { mark: "no", label: "Manual" },
    },
  },
  {
    feature: "Deploy automation",
    cells: {
      custom: { mark: "yes", label: "Retail + custom path" },
      ms: { mark: "no", label: "Not included" },
      community: { mark: "partial", label: "Sometimes" },
      raw: { mark: "no", label: "Not included" },
    },
  },
  {
    feature: "Learning curve",
    cells: {
      custom: { mark: "yes", label: "Low: 4 commands" },
      ms: { mark: "partial", label: "Medium" },
      community: { mark: "partial", label: "Varies" },
      raw: { mark: "no", label: "Steep" },
    },
  },
];

const MarkIcon: React.FC<{ mark: Cell["mark"] }> = ({ mark }) => {
  if (mark === "yes")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
        ✓
      </span>
    );
  if (mark === "partial")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold">
        ~
      </span>
    );
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-300 text-xs font-bold">
      ✕
    </span>
  );
};

const ComparisonSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-500">
        {"// comparison"}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
        How the sources stack up
      </h2>
      <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
        Different starting points, different trade-offs. Custom is our
        opinionated default, but it&apos;s not the right answer for every
        project.
      </p>
    </div>

    {/* Desktop / tablet table */}
    <div className="hidden md:block overflow-hidden rounded-2xl border border-emerald-800/40 bg-emerald-900/30">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-emerald-800/40 bg-emerald-900/50">
            <th className="text-left font-semibold text-gray-200 px-5 py-4">
              Feature
            </th>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`text-left font-semibold px-5 py-4 ${
                  c.highlight
                    ? "bg-emerald-500 text-emerald-950"
                    : "text-gray-200"
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.feature}
              className={
                idx % 2 === 0 ? "bg-transparent" : "bg-emerald-950/10"
              }
            >
              <td className="px-5 py-4 font-medium text-white">
                {row.feature}
              </td>
              {columns.map((c) => {
                const cell = row.cells[c.key];
                return (
                  <td
                    key={c.key}
                    className={`px-5 py-4 ${
                      c.highlight ? "bg-emerald-900/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MarkIcon mark={cell.mark} />
                      <span className="text-gray-200 text-xs">
                        {cell.label}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile stacked view */}
    <div className="md:hidden space-y-4">
      {columns.map((c) => (
        <div
          key={c.key}
          className={`rounded-xl p-4 ${
            c.highlight
              ? "border-2 border-emerald-500 bg-emerald-900/50"
              : "border border-emerald-800/40 bg-emerald-900/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-white">{c.label}</h3>
            {c.highlight && (
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-950">
                Default
              </span>
            )}
          </div>
          <ul className="space-y-2">
            {rows.map((row) => {
              const cell = row.cells[c.key];
              return (
                <li
                  key={row.feature}
                  className="flex items-start gap-3 text-sm"
                >
                  <MarkIcon mark={cell.mark} />
                  <div>
                    <div className="text-gray-200">{row.feature}</div>
                    <div className="text-gray-400 text-xs">{cell.label}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>

    <p className="mt-6 text-center text-xs text-gray-400 max-w-2xl mx-auto">
      Note: tools like Regolith are powerful for advanced multi-pack
      pipelines. We just optimize for fast onboarding instead.
    </p>
  </section>
);

export default ComparisonSection;

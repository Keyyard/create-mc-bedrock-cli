import React from "react";

type Cell = { mark: "yes" | "partial" | "no"; label: string };

const columns = [
  { key: "bedrock", label: "Bedrock CLI", highlight: true },
  { key: "regolith", label: "Regolith" },
  { key: "mct", label: "mct (Microsoft)" },
  { key: "raw", label: "Raw setup" },
];

const rows: { feature: string; cells: Record<string, Cell> }[] = [
  {
    feature: "Zero-setup runtime",
    cells: {
      bedrock: { mark: "yes", label: "Just Node.js" },
      regolith: { mark: "partial", label: "Filters add runtimes" },
      mct: { mark: "partial", label: "Node + config" },
      raw: { mark: "no", label: "DIY" },
    },
  },
  {
    feature: "TypeScript and JavaScript",
    cells: {
      bedrock: { mark: "yes", label: "Both, pre-wired" },
      regolith: { mark: "partial", label: "Via filters" },
      mct: { mark: "partial", label: "TS-focused" },
      raw: { mark: "no", label: "Set it up yourself" },
    },
  },
  {
    feature: "Deploy to com.mojang on save",
    cells: {
      bedrock: { mark: "yes", label: "deploy --watch" },
      regolith: { mark: "partial", label: "watch + export target" },
      mct: { mark: "partial", label: "Watch, manual reload" },
      raw: { mark: "no", label: "DIY" },
    },
  },
  {
    feature: "Finds the right game folder",
    cells: {
      bedrock: { mark: "yes", label: "GDK/Preview/UWP/Edu" },
      regolith: { mark: "partial", label: "Configured target" },
      mct: { mark: "partial", label: "Recent versions" },
      raw: { mark: "no", label: "Manual" },
    },
  },
  {
    feature: ".mcaddon packaging",
    cells: {
      bedrock: { mark: "yes", label: "One command" },
      regolith: { mark: "partial", label: "Export config" },
      mct: { mark: "partial", label: "Separate step" },
      raw: { mark: "no", label: "Zip by hand" },
    },
  },
  {
    feature: "No lock-in (plain packs)",
    cells: {
      bedrock: { mark: "yes", label: "Packs in, packs out" },
      regolith: { mark: "partial", label: "Filter pipeline" },
      mct: { mark: "yes", label: "Standard packs" },
      raw: { mark: "yes", label: "Standard packs" },
    },
  },
  {
    feature: "Learning curve",
    cells: {
      bedrock: { mark: "yes", label: "Low: 4 commands" },
      regolith: { mark: "partial", label: "Filters + config" },
      mct: { mark: "partial", label: "Medium" },
      raw: { mark: "no", label: "Steep" },
    },
  },
];

const MarkIcon: React.FC<{ mark: Cell["mark"] }> = ({ mark }) => {
  if (mark === "yes")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
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
      <p className="font-code text-xs uppercase tracking-[0.2em] text-emerald-400">
        {"// comparison"}
      </p>
      <h2 className="mt-3 font-header text-3xl md:text-4xl font-bold tracking-tight text-white">
        How Bedrock CLI compares
      </h2>
      <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
        Same goal, different trade-offs. Bedrock CLI optimizes for the shortest
        path from source to in-game for script add-ons.
      </p>
    </div>

    {/* Desktop / tablet table */}
    <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900">
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
                idx % 2 === 0 ? "bg-transparent" : "bg-zinc-950/40"
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
                      c.highlight ? "bg-emerald-500/15" : ""
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
              ? "border-2 border-emerald-500 bg-zinc-900"
              : "border border-zinc-800 bg-zinc-900/60"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-header font-semibold text-white">{c.label}</h3>
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
                    <div className="text-zinc-300 text-xs">{cell.label}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>

    <p className="mt-6 text-center text-xs text-zinc-300 max-w-2xl mx-auto">
      Note: Regolith and Dash are powerful for advanced multi-pack pipelines and
      asset transforms. Bedrock CLI is the complement, not a replacement: it
      ships plain standard packs those tools can also consume.
    </p>
  </section>
);

export default ComparisonSection;

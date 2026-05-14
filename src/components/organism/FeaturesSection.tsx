import React from "react";

interface Feature {
  title: string;
  description: string;
  code: string;
  language: string;
}

const features: Feature[] = [
  {
    title: "One command to scaffold",
    description:
      "Pick a source, get a manifest, install deps, done. No copy-paste setup.",
    language: "bash",
    code: "$ npx create-mc-bedrock\n? Project name › my-addon\n? Source › Custom (recommended)\n? Install deps? › yes\n\n✓ workspace ready in my-addon/",
  },
  {
    title: "Hot reload to com.mojang",
    description:
      "Edit, save, see it in Minecraft. No alt-tab, no manual copy.",
    language: "bash",
    code: "$ bedrock-build deploy --watch\n→ watching packs/ and src/\n→ build OK · synced BP + RP\n→ build OK · synced BP + RP",
  },
  {
    title: "Production builds",
    description:
      "Minified, sourcemap-free bundles ready for Marketplace, CurseForge, or anywhere.",
    language: "bash",
    code: "$ bedrock-build pack\n→ build --release\n→ packaged dist/my-addon-1.0.0.mcaddon",
  },
  {
    title: "TypeScript first",
    description:
      "Strict types against @minecraft/server. Autocomplete and refactor like a real codebase.",
    language: "typescript",
    code: 'import { world } from "@minecraft/server";\n\nworld.afterEvents.playerSpawn.subscribe((e) => {\n  e.player.sendMessage("Welcome!");\n});',
  },
  {
    title: "Fresh UUIDs every time",
    description:
      "Manifests are regenerated at scaffold time. Two projects never collide on import.",
    language: "json",
    code: '{\n  "header": {\n    "name": "my-addon",\n    "uuid": "9c1d…<auto>",\n    "version": [1, 0, 0]\n  }\n}',
  },
  {
    title: "Config you can actually read",
    description:
      "One bedrock.config.json controls entry, pack paths, deploy target, and engine version.",
    language: "json",
    code: '{\n  "name": "my-addon",\n  "entry": "src/main.ts",\n  "packs": { "bp": "packs/BP", "rp": "packs/RP" },\n  "deploy": { "target": "retail" }\n}',
  },
];

// Render code with a colored prompt character if the line starts with $ or >.
const renderCodeLine = (line: string, idx: number) => {
  if (line.startsWith("$ ")) {
    return (
      <span key={idx}>
        <span className="text-secondary">$</span>
        <span className="text-darkgray">{line.slice(1)}</span>
        {"\n"}
      </span>
    );
  }
  if (line.startsWith("> ")) {
    return (
      <span key={idx}>
        <span className="text-secondary">{">"}</span>
        <span className="text-darkgray">{line.slice(1)}</span>
        {"\n"}
      </span>
    );
  }
  return (
    <span key={idx} className="text-dark">
      {line}
      {"\n"}
    </span>
  );
};

const renderCode = (code: string) => {
  const lines = code.split("\n");
  return lines.map((line, i) => renderCodeLine(line, i));
};

const FeaturesSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="font-code text-xs uppercase tracking-[0.2em] text-secondary">
        {"// features"}
      </p>
      <h2 className="mt-3 font-header text-3xl md:text-4xl font-bold tracking-tight text-dark">
        Everything a professional Bedrock dev needs.
      </h2>
      <p className="mt-3 text-base text-gray max-w-2xl mx-auto">
        From an 8 year experienced developer who worked on the official
        Minecraft x Cut the Rope DLC.
      </p>
    </div>

    <div className="space-y-10 md:space-y-16">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center ${
            i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
          }`}
        >
          <div>
            <h3 className="font-header text-xl md:text-2xl font-bold text-dark">
              {f.title}
            </h3>
            <p className="mt-3 text-gray leading-relaxed">
              {f.description}
            </p>
          </div>
          <div className="relative rounded-lg border border-lightgray bg-lightgray overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-lightgray bg-light/60">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
              <span className="ml-auto text-[10px] font-code uppercase tracking-wider text-gray">
                {f.language}
              </span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 text-sm font-code leading-relaxed">
              {renderCode(f.code)}
            </pre>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;

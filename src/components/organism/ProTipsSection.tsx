import React from "react";

const tips = [
  "Use the ⭐ ts-starter template for a modern TypeScript setup.",
  "Run the CLI with npx for the latest version every time.",
  "All generated projects are ready to open in VS Code—just cd into your folder and run code .",
];

const ProTipsSection: React.FC = () => (
  <section className="py-4 max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">💡 Pro Tips</h2>
    <ul className="list-disc list-inside space-y-2 text-lg">
      {tips.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </section>
);

export default ProTipsSection;

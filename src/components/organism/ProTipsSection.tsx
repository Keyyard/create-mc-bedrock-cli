import React from "react";

const tips = [
  "Star ⭐ templates are featured to help you find the best starting points.",
  "Always use npx bedrock-cli to ensure you're running the latest version without global installations.",
  "Generated projects include VS Code workspace settings—just open the folder and start coding immediately.",
  "Take advantage of built-in features like ESLint, Prettier, and testing frameworks that come pre-configured.",
];

const ProTipsSection: React.FC = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Pro Tips</h2>
    <ul className="list-disc list-inside space-y-2 text-lg">
      {tips.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </section>
);

export default ProTipsSection;

import React from "react";

const features = [
  "Interactive CLI with sample selection",
  "Direct cloning to your specified folder (no more nested directories)",
  "Automatic manifest UUID regeneration for every project",
  "Supports both JavaScript and TypeScript samples",
  "Cleans up temporary files after setup",
];

const FeaturesSection: React.FC = () => (
  <section className="py-4 max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🛠️ Features</h2>
    <ul className="list-disc list-inside space-y-2 text-lg">
      {features.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  </section>
);

export default FeaturesSection;

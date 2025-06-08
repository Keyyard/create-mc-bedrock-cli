import React from "react";

const requirements = [
  "Node.js 18 or higher",
  "Git",
];

const RequirementsSection: React.FC = () => (
  <section className="py-4 max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📦 Requirements</h2>
    <ul className="list-disc list-inside space-y-2 text-lg">
      {requirements.map((r) => (
        <li key={r}>{r}</li>
      ))}
    </ul>
  </section>
);

export default RequirementsSection;

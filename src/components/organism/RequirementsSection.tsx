import React from "react";


const requirements = [
  {
    label: "Node.js",
    url: "https://nodejs.org/en/download/"
  },
  {
    label: "Git",
    url: "https://git-scm.com/downloads"
  },
];

const RequirementsSection: React.FC = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Requirements</h2>
    <ul className="list-disc list-inside space-y-2 text-lg">
      {requirements.map((r) => (
        <li key={r.label}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            {r.label}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default RequirementsSection;

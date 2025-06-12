import React from "react";

const ContributingSection: React.FC = () => (
  <section className="py-4 max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🤝 Contributing</h2>
    <div className="text-lg text-center space-y-4">
      <p>
        We’d love your help to make <b>Create MC Bedrock CLI</b> even better!<br />
        Whether you have ideas, spot a bug, or want to share new samples, your contributions are always welcome.
      </p>
      <p>
        Want to add a new workspace template?<br />
        Simply open a pull request to the{' '}
        <a href="https://github.com/Keyyard/custom-mc-scripting-templates" target="_blank" rel="noopener noreferrer" className="underline text-emerald-600 hover:text-emerald-800">Custom MC Scripting Templates</a> repository.
      </p>
      <p>
        Every suggestion, issue, or PR helps the community grow—jump in and let’s build something awesome together!
      </p>
    </div>
  </section>
);

export default ContributingSection;

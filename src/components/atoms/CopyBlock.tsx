import React from "react";

interface CopyBlockProps {
  code: string;
  language?: string;
}

const CopyBlock: React.FC<CopyBlockProps> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-secondary/10 border border-lightgray rounded-lg p-4 font-code text-sm overflow-x-auto">
      <pre className="whitespace-pre-wrap break-words text-dark">
        {code}
      </pre>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-secondary hover:bg-secondary/80 text-light text-xs px-2 py-1 rounded font-semibold transition"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyBlock;

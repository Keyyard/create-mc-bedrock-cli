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
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-emerald-900 text-white rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <pre className="whitespace-pre-wrap break-words">{code}</pre>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-emerald-700 hover:bg-emerald-600 text-xs px-2 py-1 rounded"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyBlock;

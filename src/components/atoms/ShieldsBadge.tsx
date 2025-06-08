import React from "react";
import Image from "next/image";

interface ShieldsBadgeProps {
  alt: string;
  src: string;
  href?: string;
}

const ShieldsBadge: React.FC<ShieldsBadgeProps> = ({ alt, src, href }) => {
  const badge = (
    <span className="inline-flex items-center">
      <Image src={src} alt={alt} width={90} height={20} className="inline" />
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {badge}
    </a>
  ) : (
    badge
  );
};

export default ShieldsBadge;

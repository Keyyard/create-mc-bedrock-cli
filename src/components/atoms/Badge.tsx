import React from "react";
import Image from "next/image";
interface BadgeProps {
  label: string;
  href?: string;
  imgSrc: string;
  alt: string;
}

const Badge: React.FC<BadgeProps> = ({ label, href, imgSrc, alt }) => {
  const badge = (
    <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-emerald-900/50 border border-emerald-800/40 text-white text-xs font-semibold">
      <Image src={imgSrc} alt={alt} width={16} height={16} />
      {label}
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

export default Badge;

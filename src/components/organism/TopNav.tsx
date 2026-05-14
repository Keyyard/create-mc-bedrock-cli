import React from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const links: NavLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "Showcase", href: "/#showcase" },
  {
    label: "GitHub",
    href: "https://github.com/keyyard/create-mc-bedrock-cli",
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/EJ4swPKJNU",
    external: true,
  },
];

const TopNav: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-light/70 backdrop-blur-md border-b border-lightgray"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-header font-bold text-dark"
        >
          <span>Bedrock CLI</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray hover:text-dark hover:bg-highlight transition"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/docs/getting-started"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-light text-sm font-semibold transition"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-dark hover:bg-highlight"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center">
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                open ? "rotate-45 translate-y-0.5" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-lightgray bg-light/95 backdrop-blur-md">
          <ul className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-darkgray hover:text-dark hover:bg-highlight"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/docs/getting-started"
                onClick={() => setOpen(false)}
                className="block text-center px-3 py-2 mt-2 rounded-full bg-secondary text-light text-sm font-semibold"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TopNav;

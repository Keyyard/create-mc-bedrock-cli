import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "start", label: "Get Started" },
  { id: "testimonials", label: "Testimonials" },
  { id: "why-use", label: "Why Use" },
  { id: "how-it-works", label: "How It Works" },
  { id: "showcase", label: "Showcase" },
  { id: "features", label: "Features" },
  { id: "requirements", label: "Requirements" },
  { id: "pro-tips", label: "Pro Tips" },
  { id: "contributing", label: "Contributing" },
];

const SideNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Navigation menu button - fixed to top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-emerald-600/80 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
        aria-label="Toggle navigation menu"
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
          <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
        </div>
      </button>

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-emerald-900/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 text-white/80 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;

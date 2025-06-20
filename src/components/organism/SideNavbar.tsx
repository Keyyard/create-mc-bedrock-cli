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
    <>      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sticky top-1/2 left-4 z-1 md:hidden text-white/70 p-2 hover:text-white transition-colors transform -translate-y-1/2"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </div>
      </button>      {/* Sidebar */}
      <nav className={`fixed top-1/2 left-0 w-64 z-10 transform -translate-y-1/2 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-2 text-white/70 hover:text-white hover:text-shadow-sm transition-all duration-200 font-light tracking-wide"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-5 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;

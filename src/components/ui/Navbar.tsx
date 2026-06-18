'use client';

import { useState, useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Temario', href: '#method' },
  { label: 'Horarios', href: '#schedule' },
  { label: 'Contacto', href: '#closing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-mogran-secondary/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-mogran-secondary/60 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav
        className="container-section mx-auto max-w-7xl"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md px-1"
            aria-label="Talleres Mogran - Ir al inicio"
          >
            <span className="text-lg md:text-xl font-bold text-white tracking-tight">
              Talleres <span className="text-mogran-primary">Mogran</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-white/70 hover:text-mogran-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA button (desktop) */}
          <div className="hidden md:block">
            <a
              href="#schedule"
              onClick={(e) => handleLinkClick(e, '#schedule')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-transparent border-2 border-mogran-primary rounded-lg hover:bg-mogran-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary"
            >
              Ver talleres
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-mogran-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <IconX size={24} strokeWidth={2} aria-hidden="true" />
            ) : (
              <IconMenu2 size={24} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-3 text-base font-medium text-white/70 hover:text-mogran-primary hover:bg-white/5 rounded-md transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#schedule"
              onClick={(e) => handleLinkClick(e, '#schedule')}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-mogran-primary rounded-lg hover:bg-mogran-primary transition-all duration-300"
            >
              Ver talleres
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

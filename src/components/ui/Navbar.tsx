'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconArrowRight } from '@tabler/icons-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Temario', href: '#method' },
  { label: 'Horarios', href: '#schedule' },
  { label: 'Test', href: '/test' },
  { label: 'Contacto', href: '#closing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Detect scroll to toggle sticky/floating state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll spy observer to highlight active section
  useEffect(() => {
    const sections = ['hero', 'method', 'schedule', 'closing'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.15,
          rootMargin: '-80px 0px -50% 0px',
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const isHome = typeof window !== 'undefined' && window.location.pathname === '/';
      if (isHome) {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const offset = isScrolled ? 90 : 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Staggered variants for mobile menu links
  const menuContainerVariants = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    },
    closed: {
      y: 30,
      opacity: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    },
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? 'top-0 w-full bg-transparent border-b border-transparent py-5 px-6 md:px-12 backdrop-blur-none'
            : isScrolled
            ? 'top-4 max-w-4xl w-[calc(100%-2rem)] rounded-full bg-white/80 border border-mogran-secondary/10 shadow-[0_20px_50px_-15px_rgba(20,33,61,0.12)] px-6 py-2.5 backdrop-blur-xl'
            : 'top-0 w-full bg-[#14213D]/95 border-b border-white/5 py-5 px-6 md:px-12 backdrop-blur-md'
        }`}
        role="banner"
      >
        <nav
          className="w-full flex items-center justify-between"
          role="navigation"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md px-1 py-0.5"
            aria-label="Talleres Mogran - Ir al inicio"
          >
            <img
              src={isMobileMenuOpen || !isScrolled ? '/images/logo/logo-light.svg' : '/images/logo/logo-dark.svg'}
              alt="Talleres Mogran"
              className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop nav links */}
          <div
            className={`hidden md:flex items-center gap-1 p-1 rounded-full backdrop-blur-sm transition-all duration-300 border ${
              isScrolled
                ? 'bg-mogran-secondary/[0.03] border-mogran-secondary/[0.04]'
                : 'bg-white/5 border-white/10'
            }`}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary ${
                    isActive 
                      ? (isScrolled ? 'text-mogran-secondary font-semibold' : 'text-white font-semibold')
                      : (isScrolled ? 'text-mogran-secondary/75 hover:text-mogran-secondary' : 'text-white/75 hover:text-white')
                  }`}
                >
                  {/* Sliding capsule background */}
                  {hoveredLink === link.href && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 bg-mogran-primary/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mogran-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA button (desktop) */}
          <div className="hidden md:block">
            <a
              href="#schedule"
              onClick={(e) => handleLinkClick(e, '#schedule')}
              className="group relative overflow-hidden inline-flex items-center justify-center pl-5 pr-4 py-2 text-xs lg:text-sm font-semibold rounded-full bg-mogran-primary text-white transition-all duration-300 hover:bg-mogran-primary-hover shadow-md shadow-mogran-primary/15 hover:shadow-lg hover:shadow-mogran-primary/25 active:scale-[0.97]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1.5 flex items-center">
                Ver talleres
              </span>
              <span className="absolute right-4 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <IconArrowRight size={14} strokeWidth={2.5} />
              </span>
              {/* Extra spacing in default state so that the text doesn't hit the boundary */}
              <span className="w-0 transition-all duration-300 group-hover:w-3" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative w-10 h-10 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-full z-50 ${
              isMobileMenuOpen
                ? 'text-white bg-white/10 hover:text-mogran-primary'
                : isScrolled
                ? 'text-mogran-secondary hover:text-mogran-primary bg-mogran-secondary/[0.04]'
                : 'text-white hover:text-mogran-primary bg-white/10'
            }`}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center">
              {/* Top line */}
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-5 h-0.5 bg-current rounded-full origin-center"
              />
              {/* Middle line */}
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-0.5 bg-current rounded-full"
              />
              {/* Bottom line */}
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-5 h-0.5 bg-current rounded-full origin-center"
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu full screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 w-full h-[100dvh] bg-mogran-secondary/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 pt-28 md:hidden dot-grid radial-glow"
          >
            <motion.div
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-6 mt-8"
            >
              {navLinks.map((link) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div variants={menuItemVariants}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="inline-block text-3xl font-bold text-white/95 hover:text-mogran-primary transition-colors py-1 focus:outline-none"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                </div>
              ))}
              <div className="overflow-hidden mt-4">
                <motion.div variants={menuItemVariants}>
                  <a
                    href="#schedule"
                    onClick={(e) => handleLinkClick(e, '#schedule')}
                    className="inline-flex items-center justify-center w-full py-4 text-base font-semibold text-white bg-mogran-primary rounded-full hover:bg-mogran-primary-hover transition-all shadow-lg shadow-mogran-primary/20"
                  >
                    Ver talleres
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile menu footer info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="border-t border-white/10 pt-6 flex flex-col gap-4 text-white/60 text-xs"
            >
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-white/80">Talleres Mogran</p>
                <p>Método práctico, paso a paso, sin presión.</p>
              </div>
              <div className="flex justify-between items-center">
                <span>Lince, Lima, Perú</span>
                <a
                  href="https://www.tiktok.com/@profesormoises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mogran-primary hover:underline font-medium"
                >
                  @profesormoises en TikTok
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

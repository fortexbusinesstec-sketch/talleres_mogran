'use client';

import { motion } from 'motion/react';
import { IconBrandTiktok, IconBrandInstagram, IconBrandFacebook, IconArrowDown } from '@tabler/icons-react';

const socials = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@oratoriamogran',
    Icon: IconBrandTiktok,
    color: 'hover:text-black',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/talleresmogran',
    Icon: IconBrandInstagram,
    color: 'hover:text-[#E4405F]',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/talleresmogran',
    Icon: IconBrandFacebook,
    color: 'hover:text-[#1877F2]',
  },
];

export function RedSection() {
  return (
    <section className="bg-mogran-primary py-10 md:py-14" aria-labelledby="redes-title">
      <div className="container-section">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Conéctate con nosotros
            </p>
            <h2
              id="redes-title"
              className="text-2xl md:text-3xl font-extrabold text-white"
            >
              Síguenos en{' '}
              <span className="underline decoration-2 underline-offset-4 decoration-white/30">
                redes sociales
              </span>
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto">
              Descubre nuestras experiencias, talleres y contenido exclusivo. Síguenos y
              vuelve para conocer más sobre Talleres Mogran.
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-colors duration-300 ${social.color}`}
                aria-label={`Síguenos en ${social.name}`}
              >
                <social.Icon
                  size={26}
                  className="text-white transition-colors duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2"
          >
            <IconArrowDown size={20} className="text-white/60" strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

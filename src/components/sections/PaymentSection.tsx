'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBuildingBank, IconDeviceMobile, IconCopy, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type BankItem = {
  id: string;
  label: string;
  bank: string;
  holder: string;
  account: string;
  cci: string;
  logoUrl: string;
};

type WalletItem = {
  id: string;
  label: string;
  type: 'wallet';
  holder: string;
  number: string;
  icon: string;
  logoUrl: string;
};

type PaymentItem = BankItem | WalletItem;

const bankData: PaymentItem[] = [
  {
    id: 'bbva',
    label: 'BBVA',
    bank: 'BBVA Continental',
    holder: 'Granados Comunicaciones SAC',
    account: '001101890200444387',
    cci: '01118900020044438781',
    logoUrl: '/images/bbva-logo.svg',
  },
  {
    id: 'bcp',
    label: 'BCP',
    bank: 'BCP',
    holder: 'Gissela Granados Zuloeta',
    account: '19118344503000',
    cci: '00219111834450300053',
    logoUrl: '/images/bcp-logo.svg',
  },
  {
    id: 'yape',
    label: 'Yape',
    type: 'wallet',
    holder: 'Gissela Granados Zuloeta',
    number: '943695799',
    icon: '/images/yape-icon.svg',
    logoUrl: '/images/yape-logo.svg',
  },
  {
    id: 'plin',
    label: 'Plin',
    type: 'wallet',
    holder: 'Moisés Granados Zuloeta',
    number: '924495063',
    icon: '/images/plin-icon.svg',
    logoUrl: '/images/plin-logo.svg',
  },
];

const logoFilters: Record<string, string> = {
  bbva: 'brightness-0 invert',
  bcp: 'brightness-0 invert',
  yape: '',
  plin: '',
};


function formatAccountNumber(account: string, id: string): string {
  if (id === 'bbva') {
    return account.replace(/^(\d{4})(\d{4})(\d{10})$/, '$1 $2 $3');
  }
  if (id === 'bcp') {
    return account.replace(/^(\d{3})(\d{7})(\d{1})(\d{3})$/, '$1-$2-$3-$4');
  }
  return account;
}

function formatCCI(cci: string): string {
  return cci.replace(/^(\d{3})(\d{3})(\d{12})(\d{2})$/, '$1-$2-$3-$4');
}

function formatWalletNumber(number: string): string {
  return number.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 border cursor-pointer ${
        copied
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80 hover:text-white'
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary`}
      aria-label={`Copiar: ${text}`}
    >
      {copied ? (
        <>
          <IconCheck size={14} strokeWidth={2.5} className="animate-scale-in" />
          Copiado
        </>
      ) : (
        <>
          <IconCopy size={14} strokeWidth={2.5} />
          Copiar
        </>
      )}
    </button>
  );
}

export function PaymentSection() {
  const [active, setActive] = useState(0);
  const item = bankData[active];
  const isWallet = 'type' in item && item.type === 'wallet';

  return (
    <section className="bg-[#14213D] section border-t border-white/5 overflow-hidden" aria-labelledby="payment-title">
      <div className="container-section">
        <SectionHeading
          kicker="07 / pagos"
          theme="dark"
          className="mb-10"
          title={<span id="payment-title">¿Cómo puedo <em>pagar</em>?</span>}
          description="Elige el método que más te acomode. Todos los datos están verificados y listos para tu transferencia."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-start">
          {/* Left — method selector as stacked pills */}
          <div className="flex flex-wrap lg:flex-col gap-3" role="tablist" aria-label="Método de pago">
            {bankData.map((m, idx) => {
              const wallet = 'type' in m && m.type === 'wallet';
              const isActive = active === idx;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(idx)}
                  className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all duration-300 lg:w-full z-10 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'border-mogran-primary text-white'
                      : 'border-white/10 text-white/60 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Sliding active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeMethodBg"
                      className="absolute inset-0 bg-mogran-primary z-0 shadow-lg shadow-mogran-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon/Logo wrapper */}
                  <span className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <img
                      src={m.logoUrl}
                      alt={m.label}
                      className={`max-h-5 max-w-7 object-contain transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-105' : 'opacity-50 group-hover:opacity-80'
                      } ${logoFilters[m.id] || ''}`}
                    />
                  </span>
                  
                  {/* Label */}
                  <span className="relative z-10 font-bold">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right — big editorial detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-7 md:p-10 relative overflow-hidden"
            >
              {/* Radial glow in details card */}
              <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-mogran-primary/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.logoUrl}
                    alt={item.label}
                    className={`max-h-8 max-w-10 object-contain ${logoFilters[item.id] || ''}`}
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white leading-tight">
                    {isWallet ? item.label : (item as BankItem).bank}
                  </h4>
                  <p className="text-sm font-medium text-white/60 mt-0.5">{item.holder}</p>
                </div>
              </div>

              {isWallet ? (
                <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1">Número de Celular</span>
                    <p className="text-2xl font-mono font-bold text-white tracking-widest">{formatWalletNumber((item as WalletItem).number)}</p>
                  </div>
                  <CopyButton text={(item as WalletItem).number} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
                    <div>
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1">Cuenta Soles</span>
                      <p className="text-xl font-mono font-bold text-white tracking-widest">
                        {formatAccountNumber((item as BankItem).account, item.id)}
                      </p>
                    </div>
                    <CopyButton text={(item as BankItem).account} />
                  </div>
                  
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
                    <div>
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1">CCI (Interbancaria)</span>
                      <p className="text-xl font-mono font-bold text-white tracking-widest">
                        {formatCCI((item as BankItem).cci)}
                      </p>
                    </div>
                    <CopyButton text={(item as BankItem).cci} />
                  </div>
                </div>
              )}

              <p className="text-sm text-white/40 mt-6 relative z-10">
                ¿Dudas? Escríbenos al{' '}
                <a
                  href="https://wa.me/51943695799?text=Hola%20Mogran%2C%20tengo%20una%20consulta%20sobre%20los%20m%C3%A9todos%20de%20pago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mogran-primary hover:text-white underline underline-offset-2 transition-colors font-medium"
                >
                  WhatsApp
                </a>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

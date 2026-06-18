'use client';

import { TabGroup } from '@/components/ui/TabGroup';
import { IconBuildingBank, IconDeviceMobile, IconCopy, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

type BankItem = {
  id: string;
  label: string;
  bank: string;
  holder: string;
  account: string;
  cci: string;
};

type WalletItem = {
  id: string;
  label: string;
  type: 'wallet';
  holder: string;
  number: string;
  icon: string;
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
  },
  {
    id: 'bcp',
    label: 'BCP',
    bank: 'BCP',
    holder: 'Gissela Granados Zuloeta',
    account: '19118344503000',
    cci: '00219111834450300053',
  },
  {
    id: 'yape',
    label: 'Yape',
    type: 'wallet',
    holder: 'Gissela Granados Zuloeta',
    number: '943695799',
    icon: '/images/yape-icon.svg',
  },
  {
    id: 'plin',
    label: 'Plin',
    type: 'wallet',
    holder: 'Moisés Granados Zuloeta',
    number: '924495063',
    icon: '/images/plin-icon.svg',
  },
];

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
      className="inline-flex items-center gap-1.5 text-xs font-medium text-mogran-primary hover:text-mogran-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary ring-offset-white rounded px-1.5 py-0.5"
      aria-label={`Copiar: ${text}`}
    >
      {copied ? (
        <>
          <IconCheck size={14} strokeWidth={2} />
          Copiado
        </>
      ) : (
        <>
          <IconCopy size={14} strokeWidth={2} />
          Copiar
        </>
      )}
    </button>
  );
}

export function PaymentSection() {
  const tabs = bankData.map((item) => {
    const isWallet = 'type' in item && item.type === 'wallet';
    return {
      id: item.id,
      label: item.label,
      content: (
        <div className="bg-white border border-mogran-border rounded-2xl p-6 md:p-8">
          {isWallet ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-mogran-tertiary border-2 border-mogran-primary/30 flex items-center justify-center mb-4">
                <IconDeviceMobile size={28} className="text-mogran-primary" />
              </div>
              <h4 className="text-xl font-bold text-mogran-secondary mb-2">{item.label}</h4>
              <p className="text-mogran-neutral mb-4">{item.holder}</p>
              <div className="flex items-center gap-3 bg-mogran-tertiary/60 rounded-xl px-5 py-3 border border-mogran-border">
                <span className="text-lg font-mono font-bold text-mogran-secondary tracking-wider">{(item as WalletItem).number}</span>
                <CopyButton text={(item as WalletItem).number} />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-mogran-border">
                <div className="w-12 h-12 rounded-full bg-mogran-tertiary border-2 border-mogran-primary/30 flex items-center justify-center flex-shrink-0">
                  <IconBuildingBank size={24} className="text-mogran-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-mogran-secondary">{(item as BankItem).bank}</h4>
                  <p className="text-sm text-mogran-neutral">{item.holder}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-mogran-tertiary/40 rounded-xl p-4 border border-mogran-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-mogran-neutral/60 uppercase tracking-wider">Cuenta Soles</span>
                    <CopyButton text={(item as BankItem).account} />
                  </div>
                  <p className="text-base font-mono font-semibold text-mogran-secondary tracking-wider">{(item as BankItem).account}</p>
                </div>

                <div className="bg-mogran-tertiary/40 rounded-xl p-4 border border-mogran-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-mogran-neutral/60 uppercase tracking-wider">CCI</span>
                    <CopyButton text={(item as BankItem).cci} />
                  </div>
                  <p className="text-base font-mono font-semibold text-mogran-secondary tracking-wider">{(item as BankItem).cci}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <section className="bg-mogran-tertiary section border-t border-mogran-border/50" aria-labelledby="payment-title">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="payment-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-secondary mb-6 text-balance"
          >
            ¿Cómo puedo <span className="text-mogran-primary">pagar</span>?
          </h2>
          <p className="text-lg text-mogran-neutral leading-relaxed">
            Elige el método que más te acomode. Todos los datos están verificados y listos para tu transferencia.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <TabGroup
            tabs={tabs}
            className="w-full"
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-mogran-neutral/60">
            ¿Tienes alguna duda? Escríbenos al{' '}
            <a
              href="https://wa.me/51943695799?text=Hola%20Mogran%2C%20tengo%20una%20consulta%20sobre%20los%20m%C3%A9todos%20de%20pago"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mogran-primary hover:text-mogran-secondary underline underline-offset-2 transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

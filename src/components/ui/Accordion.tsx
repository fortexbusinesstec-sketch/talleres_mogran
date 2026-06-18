'use client';

import { useState, KeyboardEvent, ReactNode } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className = '', allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    allowMultiple ? [] : items[0]?.id ? [items[0].id] : []
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <div className={`space-y-3 ${className}`} role="region" aria-label="Preguntas frecuentes">
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={toggleItem}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>, id: string) => void;
}

function AccordionItemComponent({ item, isOpen, onToggle, onKeyDown }: AccordionItemComponentProps) {
  return (
    <details open={isOpen} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
      <summary
        className="flex items-center justify-between w-full px-6 py-4 text-left cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary"
        onClick={(e) => {
          e.preventDefault();
          onToggle(item.id);
        }}
        onKeyDown={(e) => onKeyDown(e, item.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
        <div className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180">
          {isOpen ? (
            <IconChevronUp size={24} strokeWidth={2} className="text-mogran-primary" aria-hidden="true" />
          ) : (
            <IconChevronDown size={24} strokeWidth={2} className="text-white/50 group-hover:text-mogran-primary transition-colors" aria-hidden="true" />
          )}
        </div>
      </summary>
      <div
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-summary-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-white/70 leading-relaxed animate-fade-in">
          {item.answer}
        </div>
      </div>
    </details>
  );
}

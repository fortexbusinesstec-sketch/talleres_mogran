'use client';

import { useState, useRef, KeyboardEvent, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabGroupProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

export function TabGroup({ tabs, defaultTab, className = '', onChange }: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabsCount = tabs.length;
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (index + 1) % tabsCount;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (index - 1 + tabsCount) % tabsCount;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabsCount - 1;
        break;
      default:
        return;
    }

    const newTabId = tabs[newIndex].id;
    setActiveTab(newTabId);
    onChange?.(newTabId);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div className={className} role="tablist" aria-label="Opciones de contenido" ref={tabListRef}>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10" role="presentation">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => {
              setActiveTab(tab.id);
              onChange?.(tab.id);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-mogran-primary text-white shadow-sm font-semibold border-b-2 border-mogran-primary'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/10 rounded-lg'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="animate-fade-in"
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

interface TabPanelProps {
  children: ReactNode;
  className?: string;
}

export function TabPanel({ children, className = '' }: TabPanelProps) {
  return <div className={className}>{children}</div>;
}

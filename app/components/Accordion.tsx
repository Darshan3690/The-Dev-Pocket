"use client";

import React, { useState, useRef, useEffect } from "react";

interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // ensure first item is open by default
    if (!openId && items.length > 0) {
      setOpenId(items[0].id);
    }
  }, [items, openId]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const key = e.key;
    const max = items.length - 1;

    if (key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(max, index + 1);
      refs.current[items[next].id]?.focus();
    } else if (key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, index - 1);
      refs.current[items[prev].id]?.focus();
    } else if (key === "Home") {
      e.preventDefault();
      refs.current[items[0].id]?.focus();
    } else if (key === "End") {
      e.preventDefault();
      refs.current[items[max].id]?.focus();
    }
  };

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-gray-200 dark:border-gray-700">
            <h3>
              <button
                ref={(el) => { refs.current[item.id] = el; return; }}
                id={`accordion-button-${item.id}`}
                aria-controls={`accordion-panel-${item.id}`}
                aria-expanded={isOpen}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="w-full text-left px-4 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-600"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.question}</span>
                <span aria-hidden className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 dark:text-gray-300">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-button-${item.id}`}
              className={`px-4 pb-4 transition-all duration-200 ${isOpen ? "block" : "hidden"}`}
            >
              <div className="prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onFilterChange: (value: string) => void;
  className?: string;
}

export default function FilterBar({ 
  title, 
  options, 
  selectedValue, 
  onFilterChange, 
  className = "" 
}: FilterBarProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selectedValue === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(option.value)}
            className={`transition-all duration-200 ${
              selectedValue === option.value
                ? "bg-sky-600 text-white hover:bg-sky-700 border-sky-600"
                : "hover:border-sky-300 hover:text-sky-600 dark:hover:text-sky-400"
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                selectedValue === option.value
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}>
                {option.count}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
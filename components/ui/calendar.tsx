import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

export interface CalendarProps {
  mode?: 'single';
  selected?: Date;
  onSelect?: (date?: Date) => void;
  initialFocus?: boolean;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  return (
    <div className={cn('p-3', className)}>
      <input
        type="date"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
        value={selected ? format(selected, 'yyyy-MM-dd') : ''}
        onChange={(event) => {
          const value = event.target.value;
          onSelect?.(value ? new Date(`${value}T00:00:00`) : undefined);
        }}
      />
    </div>
  );
}
"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type TriggerChildProps = {
  onClick?: (event: React.MouseEvent) => void;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within <Popover>.');
  }
  return context;
}

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return <PopoverContext.Provider value={{ open, setOpen }}>{children}</PopoverContext.Provider>;
}

export function PopoverTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<TriggerChildProps> | React.ReactNode;
}) {
  const { open, setOpen } = usePopoverContext();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<TriggerChildProps>;

    return React.cloneElement(child, {
      onClick: (event: React.MouseEvent) => {
        child.props.onClick?.(event);
        setOpen(!open);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
}

export function PopoverContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = usePopoverContext();

  if (!open) return null;

  return (
    <div className={cn('absolute z-50 mt-2 rounded-lg border bg-white p-3 shadow-lg', className)}>
      {children}
    </div>
  );
}

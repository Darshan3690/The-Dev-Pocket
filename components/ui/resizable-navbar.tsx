"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const lastScrollY = useRef(0);

  const [visible, setVisible] = useState<boolean>(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;

    // Scroll DOWN → hide
    if (delta > 0 && latest > 120) {
      setVisible(false);
    }

    // Scroll UP → show
    if (delta < 0) {
      setVisible(true);
    }

    lastScrollY.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        y: visible ? 0 : -120,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      className={cn(
        "fixed inset-x-0 top-4 sm:top-6 mx-auto px-2 sm:px-4 md:px-6 lg:px-8 z-50 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] lg:max-w-7xl",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible }
          )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        boxShadow: visible
          ? "0 4px 30px rgba(0, 0, 0, 0.1)"
          : "0 2px 10px rgba(0, 0, 0, 0.05)",
        width: "100%",
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 8px 40px rgba(14, 165, 233, 0.2)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full px-4 md:px-6 lg:px-8 py-3 lg:flex",
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
        "shadow-lg transition-shadow duration-300",
        "border border-gray-200/50 dark:border-gray-700/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-1 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative px-5 py-2 text-gray-700 dark:text-gray-300 font-medium text-sm transition-colors hover:text-sky-600 dark:hover:text-sky-400"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-sky-100 dark:bg-sky-900/30"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        boxShadow: visible ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[600px] flex-col items-center justify-between px-3 sm:px-4 py-2.5 lg:hidden rounded-2xl sm:rounded-3xl",
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
        "border border-gray-200/50 dark:border-gray-700/50",
        "shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 sm:gap-6 rounded-2xl",
            "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
            "px-4 sm:px-6 py-6 sm:py-8 shadow-2xl",
            "border border-gray-200/50 dark:border-gray-700/50",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.div
        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <IconX className="w-6 h-6 text-gray-900 dark:text-white" />
        ) : (
          <IconMenu2 className="w-6 h-6 text-gray-900 dark:text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <motion.a
      href="/"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 group"
    >
      <div className="relative">
        <motion.svg
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="w-9 h-9 text-sky-600 dark:text-sky-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H8V8h12v12zm-3-5.5V11c0-.3-.1-.5-.4-.7l-1.5-1c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2l-1.4.9-.7-.5-.7.5-1.4-.9c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2L5.8 11c-.3.2-.4.4-.4.7V14h14v-2.5zM12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
        </motion.svg>
      </div>
      <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
        Dev Pocket
      </span>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-6 py-2.5 rounded-full text-sm font-semibold relative cursor-pointer transition-all duration-300 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 dark:from-sky-500 dark:to-blue-500 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-600",
    secondary:
      "bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transform hover:scale-105",
    dark: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105",
    gradient:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

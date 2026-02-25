"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useAccessibility } from "@/lib/accessibility";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { announce } = useAccessibility();
    const [isNearFooter, setIsNearFooter] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Toggle visibility
        setIsVisible(scrollY > 300);

        // Detect if near footer (150px threshold)
        if (scrollY + windowHeight >= documentHeight - 150) {
            setIsNearFooter(true);
        } else {
            setIsNearFooter(false);
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        announce("Scrolled to top of page", "status");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
className={`fixed right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 z-[50] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
    isNearFooter ? "bottom-32" : "bottom-8"
}`}        aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaArrowUp className="h-6 w-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

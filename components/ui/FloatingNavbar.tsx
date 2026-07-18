"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, Star, Award, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "expertise", label: "Expertise", icon: Star },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "credentials", label: "Credentials", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Since we are using snap scrolling inside <main>, we need to track scroll on the main element.
  // Wait, the main element has h-screen overflow-y-scroll snap-y.
  // This means window.scrollY is always 0. We must attach to the main container.
  
  useEffect(() => {
    const mainContainer = document.querySelector("main");
    if (!mainContainer) return;

    const handleScroll = () => {
      const currentScrollY = mainContainer.scrollTop;
      
      // Auto-hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = currentScrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    mainContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainContainer.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const mainContainer = document.querySelector("main");
    const element = document.getElementById(id);
    if (mainContainer && element) {
      // Instead of relying on native smooth scrolling which might fight snap,
      // we can just use scrollIntoView
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-max"
        >
          <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0f172a]/70 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative flex items-center justify-center p-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors duration-200 group
                    ${
                      isActive
                        ? "text-black"
                        : "text-slate-400 hover:text-white"
                    }
                  `}
                  title={item.label}
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                    <span className="hidden md:block">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

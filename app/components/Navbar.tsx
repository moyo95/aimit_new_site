"use client";
import { useState, useEffect, CSSProperties } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Wrench, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastSection, setIsPastSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services");
      const aboutSection = document.getElementById("about");
      const scrollY = window.scrollY;

      if (servicesSection || aboutSection) {
        const servicesSectionTop = servicesSection ? servicesSection.offsetTop : Infinity;
        const aboutSectionTop = aboutSection ? aboutSection.offsetTop : Infinity;
        const sectionTop = Math.min(servicesSectionTop, aboutSectionTop);

        setIsPastSection(scrollY >= sectionTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "ホーム", icon: Home, href: "/" },
    { name: "サービス", icon: Wrench, href: "/services" },
    { name: "会社概要", icon: Info, href: "/about" },
    { name: "採用情報", icon: Info, href: "/recruit" },
    { name: "お問い合わせ", icon: Phone, href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full ${isPastSection ? 'bg-black' : 'bg-gray/80'} py-1 backdrop-blur-md z-50 shadow-sm`} 
    style={
      {
        '--tw-bg-opacity': isPastSection ? '0.6' : '0.5',
      } as CSSProperties
    }>
      {/*max-w-7xl*/}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/"><Image src="/logo2.png" alt="住設プロ" width={100} height={50} /></a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-white hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニュー"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

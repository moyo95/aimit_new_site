"use client";
import { useState, useEffect, CSSProperties } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Wrench, Phone, Info, HandPlatter,Building2, UserRound, ShoppingCart, MessageCircleQuestion, GlobeLock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import debounce from 'lodash/debounce';


export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPastSection, setIsPastSection] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // メニューの表示状態を反転
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      const servicesSection = document.getElementById("services");
      const aboutSection = document.getElementById("about");
      const contactSection = document.getElementById("contact");
      const serviceSection = document.getElementById("service");
      const privacySection = document.getElementById("privacy");
      const questionSection = document.getElementById("questions");
      const scrollY = window.scrollY;

      if (servicesSection || aboutSection || contactSection || serviceSection || privacySection || questionSection) {
        const servicesSectionTop = servicesSection ? servicesSection.offsetTop : Infinity;
        const aboutSectionTop = aboutSection ? aboutSection.offsetTop : Infinity;
        const contactSectionTop = contactSection ? contactSection.offsetTop : Infinity;
        const serviceSectionTop = serviceSection ? serviceSection.offsetTop : Infinity;
        const privacySectionTop = privacySection ? privacySection.offsetTop : Infinity;
        const questionSectionTop = questionSection ? questionSection.offsetTop : Infinity;
        const sectionTop = Math.min(
          servicesSectionTop,
          aboutSectionTop,
          contactSectionTop,
          serviceSectionTop,
          privacySectionTop,
          questionSectionTop
        );

        console.log("スクロール位置:", scrollY);
        console.log("セクション上部位置:", sectionTop);

        setIsPastSection(scrollY >= sectionTop);
      }
    },100);


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "ホーム", icon: Home, href: "/" },
    { name: "サービス", icon: HandPlatter, href: "/services" },
    { name: "会社概要", icon: Building2, href: "/about" },
    { name: "採用情報", icon: UserRound, href: "/recruit" },
    { name: "よくある質問", icon: MessageCircleQuestion, href: "/questions" },
    { name: "お問い合わせ", icon: Mail, href: "/contact" },
  ];

  const mobileMenuItems = [
    { name: "ホーム", icon: Home, href: "/" },
    { name: "サービス", icon: HandPlatter, href: "/services" },
    { name: "施工事例", icon: Wrench, href: "/services/gallery" },
    { name: "会社概要", icon: Building2, href: "/about" },
    { name: "採用情報", icon: UserRound, href: "/recruit" },
    { name: "ショッピング", icon: ShoppingCart, href: "/https://u-plus-ec.jp" },
    { name: "よくある質問", icon: MessageCircleQuestion, href: "/questions" },
    { name: "プライバシー", icon: GlobeLock, href: "/privacy" },
    { name: "お問い合わせ", icon: Mail, href: "/contact" },
  ];

  return (
    <header id="top">
      <nav className={`fixed w-full ${isPastSection ? 'bg-black' : 'bg-gray/80'} py-1 backdrop-blur-md z-50 shadow-sm`} 
      style={
        {
          '--tw-bg-opacity': isPastSection ? '0.6' : '0.5',
        } as CSSProperties
      }>
        {/*max-w-7xl*/}
        <div className=" overflow-x-hidden mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
            <a href="/">
                <Image
                  src="/logo2.png"
                  alt="Logo"
                  width={245} // ここで適切な幅を指定
                  height={113} // ここで適切な高さを指定
                  // style={{ objectFit: 'cover', width: '100', height: 'auto'}}
                  style={{ width: "100px", height: "auto" }}
                  priority
                  className="rounded-md"
                />
            </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 nav-menu">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-white hover:text-primary transition-colors nav-item"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
              onClick={toggleMenu}
                variant="ghost"
                size="icon"
                // onClick={() => setIsOpen(!isOpen)}
                aria-label="メニュー"
                aria-expanded={isOpen}
                className="text-white focus:outline-none hover:bg-transparent"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
            initial={{ opacity: 0, height: 0, }}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="menu-container md:!hidden"
          >
            <div className={`flex flex-col items-start justify-start px-2 pt-20 pb-3 min-h-screen space-y-1 bg-white ${
              isOpen ? "block" : "hidden"
            }`}>
              {mobileMenuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="icon h-5 w-5" />
                  <span className="text-lg">{item.name}</span>
                </a>
              ))}
           
           <div className="grid grid-cols-2 justify-center gap-2 !mt-5">
              {[
                { src: "/banaer_uplus.jpg", alt: "名古屋の給湯器ユープラス", href: "https://u-plus-ec.jp/" ,target: "_blank" },
                { src: "/banaer_tasuke.jpg", alt: "猫カフェta助", href: "#" ,target: "_blank" },
                { src: "/banaer_renobe.jpg", alt: "ねこ飼いリノベ", href: "https://nekoai.jp/",target: "_blank" },
                { src: "/banaer_oyakata.jpg", alt: "水道工事の親方", href: "https://suidokoji-oyakata.com/" ,target: "_blank"},
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.target}
                  className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line w-full"
                >
                  <div className="responsive-image-container bg-gray-100 border border-gray-300">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={240}
                      height={150}
                      className="responsive-image"
                      priority
                    />
                  </div>
                </a>
              ))}
            </div>

            </div>
          </motion.div>
      </nav>
    </header>
  );
}

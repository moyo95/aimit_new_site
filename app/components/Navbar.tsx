"use client";

import { useState, useEffect,CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Wrench,
  HandPlatter,
  Building2,
  UserRound,
  MessageCircleQuestion,
  GlobeLock,
  Mail,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "./Logo";
import debounce from "lodash/debounce";
import UserDashboard from "../user/dashboard/page";
import { useSession } from "next-auth/react";
import AuthModal from "./LoginModal";
import LoginModal from "./LoginModal";


export default function Navbar() {
  const { data: session } = useSession(); // セッションデータを取得
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
      const newsSection = document.getElementById("news");
      const scrollY = window.scrollY;

      if (servicesSection || aboutSection || contactSection || serviceSection || privacySection || questionSection || newsSection) {
        const servicesSectionTop = servicesSection ? servicesSection.offsetTop : Infinity;
        const aboutSectionTop = aboutSection ? aboutSection.offsetTop : Infinity;
        const contactSectionTop = contactSection ? contactSection.offsetTop : Infinity;
        const serviceSectionTop = serviceSection ? serviceSection.offsetTop : Infinity;
        const privacySectionTop = privacySection ? privacySection.offsetTop : Infinity;
        const questionSectionTop = questionSection ? questionSection.offsetTop : Infinity;
        const newsSectionTop = newsSection ? newsSection.offsetTop : Infinity;
        const sectionTop = Math.min(
          servicesSectionTop,
          aboutSectionTop,
          contactSectionTop,
          serviceSectionTop,
          privacySectionTop,
          questionSectionTop,
          newsSectionTop
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

  type MenuItem = {
    name: string;
    icon: React.ElementType; // 型を調整    href: string;
    href: string; 
    external?: boolean; // external をオプションとして定義
  };
  const menuItems: MenuItem[] = [
    { name: "ホーム", icon: Home, href: "/" },
    { name: "サービス", icon: HandPlatter, href: "/services" },
    { name: "会社概要", icon: Building2, href: "/about" },
    { name: "最新情報", icon: Wrench, href: "/news" },
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


  const bannerItems = [
    {
      src: "/banaer_uplus.jpg",
      alt: "名古屋の給湯器ユープラス",
      href: "https://u-plus-ec.jp/",
    },
    {
      src: "/banaer_tasuke.jpg",
      alt: "猫カフェta助",
      href: "#",
    },
    {
      src: "/banaer_renobe.jpg",
      alt: "ねこ飼いリノベ",
      href: "https://nekoai.jp/",
    },
    {
      src: "/banaer_oyakata.jpg",
      alt: "水道工事の親方",
      href: "https://suidokoji-oyakata.com/",
    },
  ];

  return (
    <header id="top">
      <nav className={`fixed w-full ${isPastSection ? 'bg-black' : 'bg-gray/80'} py-1 backdrop-blur-md z-50 shadow-sm`} 
      style={
        {
          '--tw-bg-opacity': isPastSection ? '0.6' : '0.5',
        } as CSSProperties
      }>
        <div className="overflow-x-hidden mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                className="flex items-center space-x-2 text-white hover:text-primary transition"
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
            {/* {session ? (
      <UserDashboard />
    ) : (
      <a className="" href="/auth/signin"><Button className="text-white bg-blue-900">LOGIN</Button></a>
    )} */}
    <LoginModal />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              className="text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          className={`bg-white md:hidden ${
            isOpen ? "block" : "hidden"
          } px-6 py-4`}
        >
          <div className={`flex flex-col items-start justify-start px-2 pt-20 pb-3 min-h-screen space-y-1 bg-white ${
              isOpen ? "block" : "hidden"
            }`}>
            {mobileMenuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                // target={item.external ? "_blank" : "_self"}
                className=" flex items-center space-x-3 text-gray-700 hover:text-primary"
                // rel={item.external ? "noopener noreferrer" : undefined}
                onClick={toggleMenu}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Banners */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {bannerItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform hover:scale-105 transition-transform"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={240}
                  height={150}
                  className="rounded-lg shadow"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  );
}

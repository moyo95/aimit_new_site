// "use client";

// import { useState, useEffect, CSSProperties } from "react";
// import { motion } from "framer-motion";
// import {
//   Menu,
//   StickyNote,
//   X,
//   Home,
//   Wrench,
//   HandPlatter,
//   Building2,
//   UserRound,
//   MessageCircleQuestion,
//   GlobeLock,
//   Mail,
//   ShoppingCart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Logo from "./Logo";
// import debounce from "lodash/debounce";
// import { useSession } from "next-auth/react";
// import LoginModal from "./LoginModal";

// export default function Navbar() {
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isPastSection, setIsPastSection] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     document.body.classList.add("vsc-initialized");
//     return () => {
//       document.body.classList.remove("vsc-initialized");
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       const sections = ["elea", "hero"];
//       const scrollY = window.scrollY;
  
//       // 各セクションの範囲を判定
//       const isInSection = sections.some((id) => {
//         const section = document.getElementById(id);
//         if (section) {
//           const top = section.offsetTop;
//           const height = section.offsetHeight;
//           return scrollY >= top && scrollY < top + height;
//         }
//         return false;
//       });
  
//       // 状態更新
//       setIsPastSection(!isInSection);
//     }, 100);
  
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
  
  

//   type MenuItem = {
//     name: string;
//     icon: React.ElementType;
//     href: string;
//     external?: boolean;
//   };

//   const menuItems: MenuItem[] = [
//     { name: "ホーム", icon: Home, href: "/" },
//     { name: "サービス", icon: HandPlatter, href: "/services" },
//     { name: "会社概要", icon: Building2, href: "/about" },
//     { name: "最新情報", icon: Wrench, href: "/news" },
//     { name: "採用情報", icon: UserRound, href: "/recruit" },
//     { name: "よくある質問", icon: MessageCircleQuestion, href: "/questions" },
//     { name: "お問い合わせ", icon: Mail, href: "/contact" },
//   ];

//   const mobileMenuItems = [
//     { name: "ホーム", icon: Home, href: "/" },
//     { name: "サービス", icon: HandPlatter, href: "/services" },
//     { name: "施工事例", icon: Wrench, href: "/services/gallery" },
//     { name: "会社概要", icon: Building2, href: "/about" },
//     { name: "採用情報", icon: UserRound, href: "/recruit" },
//     { name: "ショッピング", icon: ShoppingCart, href: "/https://u-plus-ec.jp" },
//     { name: "よくある質問", icon: MessageCircleQuestion, href: "/questions" },
//     { name: "プライバシー", icon: GlobeLock, href: "/privacy" },
//     { name: "お問い合わせ", icon: Mail, href: "/contact" },
//   ];

//   const bannerItems = [
//     {
//       src: "/banaer_uplus.jpg",
//       alt: "名古屋の給湯器ユープラス",
//       href: "https://u-plus-ec.jp/",
//     },
//     {
//       src: "/banaer_tasuke.jpg",
//       alt: "猫カフェta助",
//       href: "#",
//     },
//     {
//       src: "/banaer_renobe.jpg",
//       alt: "ねこ飼いリノベ",
//       href: "https://nekoai.jp/",
//     },
//     {
//       src: "/banaer_oyakata.jpg",
//       alt: "水道工事の親方",
//       href: "https://suidokoji-oyakata.com/",
//     },
//   ];

//   return (
//     <header>
//       <nav
//         className={`fixed w-full ${
//           isPastSection ? "bg-black" : "bg-gray/80"
//         } py-1 backdrop-blur-md z-50 shadow-sm transition-all`}
//         style={{
//           "--tw-bg-opacity": isPastSection ? "0.6" : "0.5",
//         } as CSSProperties}
//       >
//         <div className="overflow-x-hidden mx-auto max-w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between md:h-16 gap-6 ">
//             <div className="flex-shrink-0">
//               <Logo />
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-8 ">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   target={item.external ? "_blank" : "_self"}
//                   className="flex items-center space-x-2 text-white hover:text-gray-400 transition whitespace-nowrap text-sm "
//                   rel={item.external ? "noopener noreferrer" : undefined}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </a>
//               ))}
//               {session && (
//                 <a
//                   href="/news/form"
//                   className="flex items-center space-x-2 text-white hover:text-gray-400 transition whitespace-nowrap"
//                 >
//                   <StickyNote className="w-5 h-5" />
//                   <span>投 稿</span>
//                 </a>
//               )}
//               <LoginModal />
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden">
//               <Button
//                 onClick={toggleMenu}
//                 variant="ghost"
//                 size="icon"
//                 aria-expanded={isOpen}
//                 aria-label="Toggle menu"
//                 className="text-white"
//               >
//                 {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{
//             opacity: isOpen ? 1 : 0,
//             height: isOpen ? "auto" : 0,
//           }}
//           transition={{ duration: 0.3 }}
//           className={`bg-white menu-container md:!hidden ${
//             isOpen ? "block" : "hidden"
//           } px-6 py-4`}
//         >
//           <div
//             className={`flex flex-col items-start justify-start px-2 pt-14 pb-3 min-h-screen space-y-1 bg-white ${
//               isOpen ? "block" : "hidden"
//             }`}
//           >
//             {mobileMenuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className=" menu-item " 
//                 onClick={toggleMenu}
//               ><item.icon className="w-5 h-5" />
//               <span>{item.name}</span>
//             </a>
//           ))}
//           {session && (
//             <a
//               href="/news/form"
//               className="menu-item"
//               onClick={toggleMenu}
//             >
//               <StickyNote className="w-5 h-5" />
//               <span>投 稿</span>
//             </a>
//           )}
//           <div className="grid grid-cols-2 justify-center gap-2 !mt-6">
//               {[
//                 { src: "/banaer_uplus.jpg", alt: "名古屋の給湯器ユープラス", href: "https://u-plus-ec.jp/" ,target: "_blank" },
//                 { src: "/banaer_tasuke.jpg", alt: "猫カフェta助", href: "#" ,target: "_blank" },
//                 { src: "/banaer_renobe.jpg", alt: "ねこ飼いリノベ", href: "https://nekoai.jp/",target: "_blank" },
//                 { src: "/banaer_oyakata.jpg", alt: "水道工事の親方", href: "https://suidokoji-oyakata.com/" ,target: "_blank"},
//               ].map((item, index) => (
//                 <a
//                   key={index}
//                   href={item.href}
//                   target={item.target}
//                   className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line w-full"
//                 >
//                   <div className="responsive-image-container bg-gray-100 border border-gray-300">
//                     <Image
//                       src={item.src}
//                       alt={item.alt}
//                       width={240}
//                       height={150}
//                       className="responsive-image"
//                       priority
//                     />
//                   </div>
//                 </a>
//               ))}
//             </div>
//         </div>

//         {/* Banners */}
//         <div className="grid grid-cols-2 gap-4 mt-6">
//           {bannerItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block transform hover:scale-105 transition-transform"
//             >
//               <Image
//                 src={item.src}
//                 alt={item.alt}
//                 width={240}
//                 height={150}
//                 className="rounded-lg shadow"
//               />
//             </a>
//           ))}
//         </div>
//       </motion.div>
//     </nav>
//   </header>
// );
// }


"use client";
import { createPortal } from "react-dom";

import { useState, useEffect, CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  StickyNote,
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
import { useSession, signOut } from "next-auth/react";
import LoginModal from "./LoginModal";
import { usePathname } from "next/navigation"; // ← 追加


export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isPastSection, setIsPastSection] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const pathname = usePathname(); // ← 現在のパスを取得
  const isDashboard = pathname === "/dashboard"; // ← dashboard判定/ ドロップダウンの状態
  // const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    document.body.classList.add("vsc-initialized");
    return () => {
      document.body.classList.remove("vsc-initialized");
    };
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const sections = ["elea", "hero"];
      const scrollY = window.scrollY;

      // 各セクションの範囲を判定
      const isInSection = sections.some((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          return scrollY >= top && scrollY < top + height;
        }
        return false;
      });

      // 状態更新
      setIsPastSection(!isInSection);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  type MenuItem = {
    name: string;
    icon: React.ElementType;
    href: string;
    external?: boolean;  // ここで 'external' をオプションとして追加
  };

  const menuItemsL: MenuItem[] = [
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
      {/* <nav
        className={`fixed top-0 left-0 w-full ${isPastSection ? "bg-black" : "bg-gray/80"} py-1 backdrop-blur-md z-50 shadow-sm transition-all`}
        style={{
          "--tw-bg-opacity": isPastSection ? "0.6" : "0.5",
        } as CSSProperties}
      > */}
      <nav
        className={`fixed top-0 left-0 w-full ${
          isDashboard
            ? "bg-black"
            : isPastSection
            ? "bg-black"
            : "bg-gray/80"
        } py-1 backdrop-blur-md z-50 shadow-sm transition-all`}
        style={{
          "--tw-bg-opacity": isPastSection ? "0.6" : "0.5",
        } as CSSProperties}
      >
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8" style={{position:"relative"}}>
          <div className="flex items-center justify-between md:h-16 gap-6">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  className="flex items-center space-x-2 text-white hover:text-gray-400 transition whitespace-nowrap text-sm"
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))} */}
              {menuItemsL.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  className="flex items-center space-x-2 text-white hover:text-gray-400 transition whitespace-nowrap text-sm"
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}

              {/* ユーザー情報とドロップダウン */}
              {session ? (
                <div
                  className="group flex items-center space-x-2 cursor-pointer"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={toggleDropdown}
                  
                >
                  <span className="
                  text-white hover:text-gray-400 hover:bg-white transition whitespace-nowrap text-sm rounded py-[5px] px-5 border border-gray-100"
                  >
                    {session.user?.name}さん
                  </span>
                  {isDropdownOpen && (
                    <div
                      className=" mt-2 w-40 bg-white border rounded shadow-lg"
                      style={{position:"absolute", zIndex:"100", right:"5px",top:"34px"}}
                    >
                      {session && (
                        <a
                          href="/news/form"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <span>投 稿</span>
                        </a>
                      )}
                      <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        ダッシュボード
                      </a>
                      <a
                        onClick={() => signOut()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        ログアウト
                      </a>

                    </div>
                  )}
                </div>
              ) : (
                <LoginModal />
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
          className={`bg-white menu-container md:!hidden ${isOpen ? "block" : "hidden"} px-6 py-4`}
        >
          <div
            className={`flex flex-col items-start justify-start px-2 pt-14 pb-3 min-h-screen space-y-1 bg-white ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {mobileMenuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className=" menu-item "
                onClick={toggleMenu}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
            {session && (
              <a
                href="/news/form"
                className="menu-item"
                onClick={toggleMenu}
              >
                <StickyNote className="w-5 h-5" />
                <span>投 稿</span>
              </a>
            )}
          </div>
        </motion.div>
      </nav>
    </header>
  );
}

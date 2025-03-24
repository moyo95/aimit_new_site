"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown  } from "lucide-react";
import BackgroundSwitcher from "./BackgroundSwitcher";

export default function Hero() {
  // スクロールする関数
  const scrollToSection = () => {
    const targetSection = document.getElementById("services"); // スクロール先のID
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // スムーズスクロール
    }
  };


  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      
       <BackgroundSwitcher /> {/* 背景切り替えコンポーネント */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <article className="gradient-text">
              <p className="text-primary-foreground leading-tight underline">アイミットの目指す</p>
              <p className="text-primary-foreground leading-tight">
                快適な暮らしを支える住宅設備のプロフェッショナル<span className="text-yellow-300 !important">『地域No.1』</span>
              </p>
            </article>
          </h1>
          <p className="text-sl md:text-xl text-gray-200 mb-8">
            最新の技術と確かな施工で、お客様の理想の住環境を実現します。
            水回りのリフォームから、あらゆるニーズにお応えします。
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" >
            <Button size="lg" className="bg-primary text-white">
              無料見積もりを依頼 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </a>
            <a href="/services">
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white">
              サービス詳細
            </Button>
            </a>
          </div>
        </motion.div>
      </div>
      {/* 動きのあるマウス型スクロールボタン */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-10 w-full text-center z-10"
        >
          <div
            onClick={scrollToSection}
            className="cursor-pointer mx-auto h-16 w-10 border-2 border-white rounded-full relative"
            aria-label="Scroll down"
            style={{
              animation: "mouseScroll 2s infinite",
            }}
          >
            {/* 内側のスクロールするドット */}
            <div
              className="absolute left-1/2 h-3 w-3 rounded-full bg-white"
              style={{
                transform: "translateX(-50%)",
                animation: "mouseDotScroll 2s infinite",
              }}
            ></div>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes mouseScroll {
            0% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.5;
            }
          }

          @keyframes mouseDotScroll {
            0% {
              top: 10px;
            }
            50% {
              top: 35px;
            }
            100% {
              top: 10px;
            }
          }
        `}</style>

    </div>
  );
}

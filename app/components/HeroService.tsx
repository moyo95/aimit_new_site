"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroService() {
  return (
    <div className="relative min-h-[600px] flex items-center max-w-1980" id="hero">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("/phot4.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "600px",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          アイミットの目指すこと
            <br />
            <span className="text-primary-foreground">快適な暮らしを支える住設機器のプロフェッショナル</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            最新の技術と確かな施工で、お客様の理想の住環境を実現します。
            水回りのリフォームから設備の修理まで、あらゆるニーズにお応えします。
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-white">
              無料見積もりを依頼 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white">
              サービス詳細
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
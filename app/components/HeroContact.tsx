"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
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
          お問合せフォーム

          </h1>
          <p className="text-xl text-gray-200 mb-8">
            最新の技術と確かな施工で、お客様の理想の住環境を実現します。
            水回りのリフォームから設備の修理まで、あらゆるニーズにお応えします。
          </p>
          
        </motion.div>
      </div>
    </div>
  );
}
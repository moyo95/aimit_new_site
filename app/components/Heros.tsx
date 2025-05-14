"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown  } from "lucide-react";
import BackgroundSwitcher from "./BackgroundSwitcher";
import heroData from "../../public/data/heroData.json";
import React from "react";
import Image from 'next/image';

interface HerosProps {
    id: string;
    title: string;
    // subtitle: string;
    subtitle?: string; // 🔥 オプションに変更！
    description?: string;
    backgroundImage: string;
    primaryButton: { text: string; link: string };
    secondaryButton?: { text: string; link: string };
  }
  
  export default function Heros({
    id,
    title,
    subtitle,
    description,
    backgroundImage,
    primaryButton,
    secondaryButton,
  }: HerosProps) {
    
    return (
      <div className="relative min-h-[500px] flex items-center" id={id}>
        <div
        id="elea"
          className="absolute inset-0 z-0"
          ><Image
          src={backgroundImage}
          alt="Background Image"
          fill
          style={{ objectFit: 'cover' }}
          priority // 画像を優先的に読み込む
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
            <h1 className="block md:flex items-center text-4xl md:text-5xl font-bold text-white mb-4 md:leading-tight leading-8">
            {title}
            <p className=" text-xl md:text-3xl mt-1 mx-3">{subtitle}</p> 
            </h1>
            
            <p className="text-sl md:text-xl text-gray-200 mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={primaryButton.link}>
                <Button size="lg" 
                className="bg-red-500 text-white">
                  {primaryButton.text}
                </Button>
              </a>
              {secondaryButton && (
                <a href={secondaryButton.link}>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white">
                    {secondaryButton.text}
                  </Button>
                </a>
              )}
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  
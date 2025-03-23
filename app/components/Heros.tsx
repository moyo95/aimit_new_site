"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown  } from "lucide-react";
import BackgroundSwitcher from "./BackgroundSwitcher";
import heroData from "../../public/data/heroData.json";
import React from "react";

interface HerosProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
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
      <div className="relative min-h-[600px] flex items-center" id={id}>
        <div
        className="absolute inset-0 z-0"
        style={{
            backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "600px",
        }}
      >
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
            <h1 className="block md:flex items-center text-4xl md:text-5xl font-bold text-white mb-6 md:leading-tight leading-8">
            {title}
            <span className="inline-block text-xl md:text-3xl my-0 md:my-auto">{subtitle}</span> 
            </h1>
            <p className="text-sl md:text-xl text-gray-200 mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={primaryButton.link}>
                <Button size="lg" className="bg-primary text-white">
                  {primaryButton.text}
                </Button>
              </a>
              {secondaryButton && (
                <a href={secondaryButton.link}>
                  <Button size="lg" variant="outline">
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
  
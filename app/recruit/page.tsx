"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import HeroRecruit from "../components/HeroRecruit";
import Image from 'next/image';

export default function Recruit() {
  return (
    <>
    <HeroRecruit />
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">アルバイト・パート大募集！</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          アイミット株式会社は、志のある新しい仲間を求めています。未経験者の方・
          経験者の方、アルバイトを始めて一歩を踏み出したい方など歓迎します。
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="block md:flex gap-24"
          >
           
           <div className="mb-16 flex-1">
              <div className="relative rounded-lg overflow-hidden w-full h-60">
                  <Image src="/blog-1-1.jpg"
                  alt="住設プロ"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  />
              </div>
              <h3 className="text-2xl text-gray-700 font-semibold my-4">営業スタッフ（経験者歓迎）</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                    <p className="text-base text-primary leading-loose">営業職の立ち上げに伴い、スタッフを広く募集しています。共にやり易い環境を考え、
                      名古屋で１番の給湯器販売会社を目指しましょう。取り扱う商品は給湯器です。ノルマはありません。</p>
                  </div>
                </div>
                <Button size="sm" className="bg-primary text-white mt-5">
              READ MORE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </div>
            

            <div className="mb-16 flex-1">
              <div className="relative rounded-lg overflow-hidden w-full h-60">
                  <Image
                  src="/blog-2-1.jpg"
                  alt="住設プロ"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  />
              </div>
              <h3 className="text-2xl text-gray-700 font-semibold my-4">事務スタッフ（未経験者可）</h3>
              <div className="space-y-4 ">
                <div className="flex items-start space-x-4">
                    <p className="text-base text-primary leading-loose">事務スタッフの募集です。空いた時間に始めてみませんか？
                      勤務時間の融通も効きますので、子育て中のママも大歓迎です。</p>
                </div>
              </div>
              <Button size="sm" className="bg-primary text-white mt-5">
              READ MORE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mb-16 flex-1">
              <div className="relative rounded-lg overflow-hidden w-full h-60">
                <Image
                 src="/blog-3-1.jpg"
                 alt="住設プロ"
                 layout="fill"
                 objectFit="cover"
                className="rounded-lg" />
              </div>
              <h3 className="text-2xl text-gray-700 font-semibold my-4">施工スタッフ（未経験者可）</h3>
              <p className="mb-2"><span className="text-primary">パート・アルバイト</span></p>
              <div className="space-y-4 ">
                <div className="flex items-start space-x-4">
                    <p className="text-base text-primary leading-loose">施工スタッフの募集です。給湯器の取付をメインに活躍して頂けます。未経験者も歓迎です。
                      ベテランメンバーがあなたをサポートしますので、技術を習得して頂けます。</p>
                </div>
              </div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-primary text-white mt-5">
                  READ MORE <ArrowRight className="ml-2 h-4 w-4S" />
                </Button>
              </a>
            </div>
          </motion.div>

         
        </div>

      </div>
    </section>
    </>
  );
}
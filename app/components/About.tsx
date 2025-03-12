"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, ThumbsUp, CircleGauge,Files } from "lucide-react";

const stats = [
  { icon: Users, value: "信頼の責任施工", label: "アイミットのスタッフは、豊富な経験と確かな技術を持った有資格者が責任を持って工事させていただきます" },
  { icon: Files, value: "安心の長期保証", label: "お客様に安心して当社をご利用いただけるよう製品及び工事に、無償で長期保証をお付けしております" },
  { icon: CircleGauge, value: "スピード対応", label: "お客様のご予定をお伺いし、可能な限り迅速に対応させていただきます" },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">アイミットが選ばれる3つの理由</h2>
            <p className="text-gray-600 mb-6">
            地域に密着したサービスを展開しているアイミット株式会社は、<br />お客様より大変ご好評を頂いております
            </p>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="rounded-lg overflow-hidden h-[400px]"
              style={{
                backgroundImage: "url('/phot4.avif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-24 my-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="h-8 w-12 mx-auto mb-4 text-primary" />
              <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
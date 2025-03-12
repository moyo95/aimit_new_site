"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Thermometer, Home, Wrench, Shield, Clock } from "lucide-react";
import HeroService from "../components/HeroService";

const services = [
  {
    icon: Droplet,
    title: "給排水設備",
    description: "水道管の修理・交換から、新規設置まで。漏水対策も万全です。",
  },
  {
    icon: Thermometer,
    title: "空調設備",
    description: "エアコンの設置・メンテナンス。最新の省エネ機器もご提案。",
  },
  {
    icon: Home,
    title: "住宅設備",
    description: "キッチン、お風呂、トイレなど、住宅設備のリフォーム・修理。",
  },
  {
    icon: Wrench,
    title: "修理・メンテナンス",
    description: "定期点検から緊急修理まで、24時間365日対応可能。",
  },
];

const features = [
  {
    icon: Shield,
    title: "安心の保証制度",
    description: "工事後1年間の保証付き。アフターフォローも万全です。",
  },
  {
    icon: Clock,
    title: "迅速な対応",
    description: "緊急時は最短30分で現場に到着。素早い対応を心がけています。",
  },
];

const Service = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
    <HeroService />
    <section id="service" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">サービス内容</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            プロフェッショナルの技術者が、お客様の快適な暮らしをサポートします。
            住宅設備のことなら、どんなことでもお任せください。
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <feature.icon className="h-8 w-8 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
export default Service;
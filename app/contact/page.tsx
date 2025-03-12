"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import HeroContact from "../components/HeroContact";
import ContactForm from "../components/contactForm";

export default function Contact() {
  return (
    <>
    <HeroContact />
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            お見積り・ご相談は無料です。お気軽にお問い合わせください。<br />
            専門スタッフが丁寧に対応させていただきます。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
           
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-8">お問い合わせ方法</h3>
              <div className="space-y-4 grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">お電話</h4>
                    <p className="text-2xl font-bold text-primary">052-934-7831</p>
                    <p className="text-gray-600">平日 09:00~18:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">メール</h4>
                    <p className="text-gray-600">info@aimit.jp</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">所在地</h4>
                    <p className="text-gray-600">
                      〒100-0001
                      <br />
                      愛知県名古屋市北区山田1丁目16-12<br />
                      <span className="my-3">地下鉄：大曽根駅・JR大曽根駅より徒歩５分</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-xl font-semibold mb-4">緊急の修理依頼</h3>
              <p className="mb-4">
                水漏れなどの緊急を要する修理は、お電話にて24時間受け付けております。
                最短30分で現場に到着いたします。
              </p>
              <Button variant="secondary" size="lg" className="w-full">
                緊急修理を依頼 <Phone className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
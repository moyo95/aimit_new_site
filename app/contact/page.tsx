"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "../components/contactForm";
import Heros from "../components/Heros";
import heroData from "../../public/data/heroData.json";

export default function Contact() {
  return (
    <>
    <Heros
    id={heroData.contact.id}
    title={heroData.contact.title}
    subtitle={heroData.contact.subtitle}
    description={heroData.contact.description}
    backgroundImage={heroData.contact.backgroundImage}
    primaryButton={heroData.contact.primaryButton}
    secondaryButton={heroData.contact.secondaryButton}
     />
    <section id="contact" className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            お見積り・ご相談は無料です。お気軽にお問い合わせください。<br />
            専門スタッフが丁寧に対応させていただきます。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
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
            className="space-y-8 relative"
          >
            <div className="mb6 md:mb-16 relative">
              <h3 className="text-2xl font-semibold mb-8">お問い合わせ方法</h3>
              <div className="space-y-4 ">
                <div className="row grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-4">                    
                      <div>
                        <div className="flex items-center">
                          <Phone className="h-6 w-6 mr-2 text-primary flex-shrink-0" />
                          <h4 className="text-xl font-semibold">お電話</h4>
                        </div>
                        <div className="ml-7">
                          <p className="text-2xl font-bold text-gray-600">052-934-7831</p>
                          <p className="text-gray-600">平日 09:00~18:00</p>
                        </div>    
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div>
                          <div className="flex items-center">
                            <Mail className="h-6 w-6 mr-2 text-primary flex-shrink-0" />
                            <h4 className="text-xl font-semibold">メール</h4>
                          </div>
                          <div className="ml-7">
                            <p className="text-2xl font-bold text-gray-600">info@aimit.jp</p>
                          </div>    
                      </div>
                    </div>
                </div>

                <div className="space-x-4 w-full ">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-primary flex-shrink-0" />
                      <h4 className="text-xl font-semibold">所在地</h4>
                    </div>
                  
                    <div className="ml-[29px] text-gray-600 text-xl">
                        〒462-0810
                        <br />
                        愛知県名古屋市北区山田1丁目16-12<br />
                        <span className="my-4 text-base">( 地下鉄：大曽根駅・JR大曽根駅より徒歩５分 )</span>
                    </div>
                </div>
                
              </div>
            </div>

            <Card className="p-6 mt-0 md:mt-8 bg-primary text-primary-foreground static md:absolute bottom-0">
              <h3 className="text-xl font-semibold mb-4">緊急の修理依頼</h3>
              <p className="mb-4">
                水漏れなどの緊急を要する修理は、お電話にて 9:00~18:00 の間で受け付けております。
                最短30分で現場に到着いたします。
              </p>
              <Button variant="secondary" size="lg" className="w-full">
              <Phone className="ml-2 h-5 w-5 mr-1" />緊急修理を依頼
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
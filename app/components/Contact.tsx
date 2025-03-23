"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./contactForm";

type ContactProps = {
  className?: string;
};

const Contact: React.FC<ContactProps> = ({ className }) => {  return (
    <section id="contact" className={` bg-gray-50 relative py-16 h-auto md:h-screen flex items-center  ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-10">お問い合わせ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 leading-loose">
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
            className="space-y-8 relative"
          >
            <div className="mb-16 relative">
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
                          <p className="text-xl font-bold text-gray-600">052-934-7831</p>
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
                            <p className="text-xl font-bold text-gray-600">info@aimit.jp</p>
                          </div>    
                      </div>
                    </div>
                </div>

                <div className="space-x-4 w-full ">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-primary flex-shrink-0" />
                      <h4 className="text-xl font-semibold">所在地</h4>
                    </div>
                  
                    <div className=" text-gray-600 text-lg">
                        〒462-0810
                        <br />
                        愛知県名古屋市北区山田1丁目16-12<br />
                        <span className="my-4 text-base">( 地下鉄：大曽根駅・JR大曽根駅より徒歩５分 )</span>
                    </div>
                </div>
                
              </div>
            </div>

            <Card className="p-6 bg-primary text-primary-foreground  md:absolute bottom-0 relative">
              <h3 className="text-xl font-semibold mb-4">緊急の修理依頼</h3>
              <p className="mb-4">
                水漏れなどの緊急を要する修理は、お電話にて受け付けております。
                最短30分で現場に到着いたします。
              </p>
              <a href="tel:0123456789">
              <Button variant="secondary" size="lg" className="w-full">
              <Phone className="mr-2 h-5 w-5" />緊急修理を依頼
              </Button>
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
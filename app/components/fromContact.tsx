"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import EntryForm from "../components/entryForm";
import styles from './fromContact.module.css';


type fromContactProps = {
    className?: string;
  };
  
  const FromContact: React.FC<fromContactProps> = ({ className }) => {
  return (
    <>
    <section id="contact" className={`py-20 bg-blue-50 ${className}`}>
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">エントリーフォーム</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ご応募いただき、誠にありがとうございます。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
           
            <EntryForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 relative"
          >
            <div className="mb-16 relative">
              <div className="space-y-4">
                <div className="border border-gray-300 bg-white p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-lg font-bold">
                    <span>選考フロー</span>
                  </h2>
                  <div className="mt-4">
                    <ol className="">
                      {/* STEP 01 */}
                    <li className={`${styles.pFlowList__item} pFlowList__item border border-gray-200 p-4 rounded-md`}>
                        <span className="pFlowList__step flex items-center space-x-2">
                          <span>STEP</span>
                          <span className="pFlowList__step_num font-semibold text-primary">01</span>
                        </span>
                        <div className={`pFlowList__item_body mt-2`}>
                          <span className="pFlowList__headline">エントリー</span>
                        </div>
                        <p className="mt-2 text-gray-600">エントリー内容を送信いただくことで選考が開始されます。</p>
                      </li>

                      {/* STEP 02 */}
                      <li className={`${styles.pFlowList__item}  border border-gray-200 p-4 rounded-md`}>
                        <span className="pFlowList__step flex items-center space-x-2">
                          <span>STEP</span>
                          <span className="pFlowList__step_num font-semibold text-primary">02</span>
                        </span>
                        <div className="pFlowList__item_body mt-2">
                          <span className="pFlowList__headline">
                            履歴書を提出して頂きます。
                          </span>
                        </div>
                      </li>

                      {/* STEP 03 */}
                      <li className={`${styles.pFlowList__item}  border border-gray-200 p-4 rounded-md`}>
                        <span className="pFlowList__step flex items-center space-x-2">
                          <span>STEP</span>
                          <span className="pFlowList__step_num font-semibold text-primary">03</span>
                        </span>
                        <div className="pFlowList__item_body mt-2">
                          <span className="pFlowList__headline">
                            書類選考（書類選考合格者のみご連絡）
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">提出書類をもとに選考を行います。</p>
                      </li>

                      {/* STEP 04 */}
                      <li className={`${styles.pFlowList__item}  border border-gray-200 p-4 rounded-md`}>
                        <span className="pFlowList__step flex items-center space-x-2">
                          <span>STEP</span>
                          <span className="pFlowList__step_num font-semibold text-primary">04</span>
                        </span>
                        <div className="pFlowList__item_body mt-2">
                          <span className="pFlowList__headline">一次選考</span>
                          <ul className="pFlowList__list list-disc ml-6 mt-2">
                            <li className="pFlowList__list_item">個人面接（オンライン・オフライン）</li>
                          </ul>
                        </div>
                        <p className="mt-2 text-gray-600">個人面接を実施し、スキルや経験を確認します。</p>
                      </li>

                      {/* STEP 05 */}
                      <li className="pFlowList__item border border-gray-200 p-4 rounded-md">
                        <span className="pFlowList__step flex items-center space-x-2">
                          <span>STEP</span>
                          <span className="pFlowList__step_num font-semibold text-primary">05</span>
                        </span>
                        <div className="pFlowList__item_body mt-2">
                          <span className="pFlowList__headline">合否の結果をお知らせします。</span>
                          <span className="pFlowList__text block mt-2">
                            採用された方は、勤務開始となります。
                          </span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>




           
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
export default FromContact;
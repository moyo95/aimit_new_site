"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Heros from "../components/Heros";
import heroData from "../../public/data/heroData.json";

// Type definition for questions
type Question = {
  link1: string; // URL for the question icon image
  question: string; // The question text
  link2: string; // URL for the answer icon image
  answer: string; // The answer text
};

// Questions array
const questions: Question[] = [
  {
    link1: "/img/icon.q.png",
    question: "フルオートとオートの違いは？",
    link2: "/img/icon.a.png",
    answer: "フルオート・オート共に湯張り自動ストップ及び追い炊き機能はつきますが、フルオートには設定湯量への自動たし湯がつきます。",
  },
  {
    link1: "/img/icon.q.png",
    question: "4人家族の場合号数や容量はどれが合いますか？",
    link2: "/img/icon.a.png",
    answer: "特に大量出湯を必要としない一般的な4人家族なら24号が標準的なめやすです。",
  },
  {
    link1: "/img/icon.q.png",
    question: "エコジョーズにするメリットは何ですか？",
    link2: "/img/icon.a.png",
    answer: "エコジョーズは従来の給湯器より熱効率がアップし、CO2排出量を約13％削減します。またガス料金の低減も可能です。",
  },
  {
    link1: "/img/icon.q.png",
    question: "エコジョーズって何？",
    link2: "/img/icon.a.png",
    answer: "エコジョーズとは、今まで利用せずに排気していた、お湯を温めるときに出る高温の燃焼ガスを再利用し、あらかじめ水を温めます。予熱するダブルの効果により、従来タイプに比べて少ないガス消費量で加熱でき、エネルギーをムダにすることなく高い熱効率を実現した給湯器です。",
  },
  {
    link1: "/img/icon.q.png",
    question: "大きな浴槽に追い炊き機能つき給湯器は設置できますか？",
    link2: "/img/icon.a.png",
    answer: "おいだき機能付のふろ給湯器は、一般家庭用となり、取付できる浴槽の大きさは、340リットルまでとなります。それ以上の大きさの浴槽の場合、湯温かくはん性が落ちてしまう場合があります。",
  },
  {
    link1: "/img/icon.q.png",
    question: "給湯器を交換したいのですが、現在使用しているリモコンはそのまま使えますか？",
    link2: "/img/icon.a.png",
    answer: "給湯器には、適合するリモコンがあります。適合していないリモコンでは、給湯器を操作することができませんので、給湯器に適合するリモコンに交換してください。",
  },
];

const Questions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 子要素に0.3秒ずつ間隔をつける
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // 最初は非表示かつ下にずれている
    visible: {
      opacity: 1,
      y: 0, // 表示して位置を戻す
      transition: { duration: 0.5 }, // 各ブロックのアニメーション時間
    },
  };

  return (
    <>
      <Heros
      id={heroData.questions.id}
      title={heroData.questions.title}
      subtitle={heroData.questions.subtitle}
      description={heroData.questions.description}
      backgroundImage={heroData.questions.backgroundImage}
      primaryButton={heroData.questions.primaryButton}
      secondaryButton={heroData.questions.secondaryButton}
      />
      <section id="questions" className="py-10 md:py-20 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 my-10 md:my-20">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">よくある質問</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-loose">
              給湯器・トイレ・バスなどの交換、取付、工事など、全く知識のない方でもご安心してご利用いただけるよう、ご質問にお答えしています。
            </p>
          </div>

          <motion.div
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           >
            {questions.map((question, index) => (
              <motion.div
                key={`question-${index}`}
                variants={itemVariants}
                
                className="bg-white shadow-lg rounded-lg"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-start">
                    <Image
                      src={question.link1}
                      width={45}
                      height={45}
                      alt="質問アイコン"
                      className="mt-2 mr-4 rounded-lg"
                    />
                    <CardTitle className="mt-0 text-lg font-bold">{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <CardDescription>
                    <span className="flex items-start">
                      <Image
                        src={question.link2}
                        width={45}
                        height={45}
                        alt="回答アイコン"
                        className="mr-4 rounded-lg"
                      />
                      <span className="text-gray-700 leading-loose">{question.answer}</span>
                    </span>
                  </CardDescription>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Questions;

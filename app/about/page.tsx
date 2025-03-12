"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, ThumbsUp } from "lucide-react";
import HeroAbout from "../components/HeroAbout";
import Image from 'next/image';

const stats = [
  { icon: Users, value: "1000+", label: "お客様対応実績" },
  { icon: Clock, value: "12時間", label: "緊急対応" },
  { icon: Award, value: "21年", label: "業界経験" },
  { icon: ThumbsUp, value: "98%", label: "顧客満足度" },
];

export default function About() {
  return (
    <>
    <HeroAbout />
    <section id="about" className="py-20">
      <div className="container mx-auto px-4  my-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-600">私たちについて</h2>
            <p className="text-gray-600 mb-6 leading-loose">
              1993年の創業以来、地域の皆様の住環境の向上に貢献してきました。
              熟練の技術者たちが、最新の技術と長年の経験を活かし、
              お客様一人一人のニーズに合わせた最適なソリューションを提供しています。
            </p>
            <h3 className="text-xl font-bold mb-2 text-gray-600">企業理念</h3>
            <p className="text-gray-600 mb-6 leading-loose">
            現場の強みを社会に還元し、より良い住環境を目指します。<br />
              24時間365日の緊急対応体制を整え、突発的なトラブルにも迅速に対応。
              お客様の「困った」を解決し、安心で快適な暮らしをサポートします。
            </p>
            <h3 className="text-xl font-bold mb-2 text-gray-600">まず心掛ける３つのこと</h3>
            <ol className="text-gray-600 mb-6 leading-loose">
              <li className="check_icon">工事業者の地位・環境向上に努める「rise」立ち上がろう</li>
              <li className="check_icon">相手が求めているものを追求する「ask」尋ねよう</li>
              <li className="check_icon">とにかくやってみる！「try」進めよう</li>
            </ol>
            <h3 className="text-xl font-bold mb-2 text-gray-600">そしてすべきこと</h3>
            <ol className="text-gray-600 mb-6 leading-loose">
              <li className="check_icon">やらなければ始まらない</li>
              <li className="check_icon">やれなければ成長しない</li>
            </ol>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section id="about__greeting" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=" lg:order-1 sm:order-2"
          >
            
            <h2 className="font-bold text-xl md:text-2xl text-gray-600 mb-2">代表あいさつ</h2>
            <p className="text-gray-600 mb-6 leading-loose">
              創業以来一貫してお客様第一主義の信念の下、快適な住環境のご提供を明日への活力にし、お客様に満足いただける様に
              日々変革していきたいと考えております。そのためには社員一同の幸せも必要不可欠であり、「楽しんでこそ人生」を
              モットーに社員が誇れる会社へと、これからも成長してまいります。 日々、技術を磨き続ける事がこれからも地域に
              愛される企業になれると確信し、確かな商品とサービスを提供してまいります。
              </p>
            
            <h3 className="text-xl font-bold mb-2 text-gray-600">まず心掛ける３つのこと</h3>
            <p className="text-gray-600 mb-2 leading-loose">当社は給湯器に特化した販売・取付サービス会社です。もちろん水回りに関するバス・トイレ・キッチン等にも対応しています。
               我々アイミットという会社は、世の中に貢献し、仲間を成長させるためのツールだとも言えます。企業理念の通り、
               この事業を通して地域の方々に喜んでいただき、仲間の成長に繋がれば、これほど嬉しいことはありません。 
               「名古屋で１番！」を目指し全力で挑戦してまいります。 今後とも一層のご指導ご鞭撻のほどよろしくお願い申し上げます。</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative "
          >
          

            <div
              className="rounded-lg overflow-hidden h-[400px] wavy-circle"
              style={{
                backgroundImage: "url('/phot4.avif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </motion.div>
        </div>

       
      </div>
    </section>
    <section id="about__Overview" className="py-20">
      <div className="container mx-auto px-4  my-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
             <h2 className="font-bold text-xl md:text-2xl text-gray-700 mb-3">会社概要</h2>
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-gray-300 md:border-none block md:table-row">
                  <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">項目</th>
                  <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">内容</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">社名</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">アイミット株式会社</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">代表者</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">代表取締役 佐藤真仁</td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">本社所在地</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">愛知県名古屋市北区山田1丁目16-12</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">創業</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2004年1月</td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">設立</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2014年4月</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">資本金</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">300万円</td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">従業員数</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">13名</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">事業内容</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    <ul className="list-disc list-inside">
                      <li>住宅設備販売事業（販売・取付工事）</li>
                      <li>リフォーム事業</li>
                      <li>賃貸リノベーション</li>
                      <li>フルリノベーション</li>
                      <li>店舗改装</li>
                      <li>広告事業</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">取引先銀行</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">中日信用金庫・名古屋銀行</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">主な許認可番号</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">建設業／愛知県知事許可（般-28）第108162号</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-xl md:text-2xl text-gray-700 mb-3">会社沿革</h2>
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-gray-300 md:border-none block md:table-row">
                  <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">年</th>
                  <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">内容</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2004年1月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">愛知県春日井市にて「さとう設備」創業</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2013年12月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">愛知県名古屋市北区に事務所移転</td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2014年4月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">「アイミット株式会社」設立</td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2018年6月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">ECサイト『ユープラス（U+plus）開設 URL: <a href="https://u-plus-ec.jp" className="text-blue-500 hover:underline">https://u-plus-ec.jp</a></td>
                </tr>
                <tr className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2018年6月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">ねこ飼いリノベ （nekoAi）開設 URL: <a href="https://nekoai.jp" className="text-blue-500 hover:underline">https://nekoai.jp</a></td>
                </tr>
                <tr className="bg-white border border-gray-300 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">2018年6月</td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">ねこカフェ「ta助」オープン </td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-7 mt-10 border py-9">
            <a href="https://u-plus-ec.jp" className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line">
                <Image
                    src="/banner.jpg"
                    alt="ユープラス" 
                    width={240} 
                    height={150}
                    className="m-0 p-0"
                    />
                </a>
                <a href="https://nekoai.jp" className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line">
                  <Image
                    src="/banner.jpg"
                    alt="ねこ飼いリノベ" 
                    width={240} 
                    height={150}
                    className="m-0 p-0"
                    />
                </a>
                <a href="https://u-plus-ec.jp" className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line">
                  <Image
                    src="/banner.jpg"
                    alt="ユープラス" 
                    width={240} 
                    height={150}
                    className="m-0 p-0"
                    />
                </a>
                <a href="https://nekoai.jp" className="relative flex items-center space-x-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover-border-line">
                  <Image
                    src="/banner.jpg"
                    alt="ねこ飼いリノベ" 
                    width={240} 
                    height={150}
                    className="m-0 p-0"
                    />
                </a>
                
            </div>
          

          </motion.div>
        </div>
      </div>
    </section>

    <section>
    <div className="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=xxxxx"
    style={{ border: 0 }}
    allowFullScreen 
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


    </section>
    </>
  );
}
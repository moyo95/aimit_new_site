"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Thermometer, Home, Wrench, Shield, Clock, Building, SquareSquare, ShoppingCart } from "lucide-react";
import HeroService from "../components/Heros";
import Image from 'next/image';
import Heros from "../components/Heros";
import heroData from "../../public/data/heroData.json";


// export const metadata = {
//   title: "サービス内容 | アイミット株式会社 - 名古屋市で",
//   description: "当社のサービス内容をご紹介します。お客様のニーズに応じたプロフェッショナルな対応を提供。詳しくはお問い合わせください。",
//   keywords: "サービス, サポート, アイミット株式会社, 名古屋市",

//   "og:title": "サービス内容 | [会社名]",
//   "og:description": "プロフェッショナルなサポート内容をご紹介。詳細はこちら。",
//   "og:image": "/path-to-image.jpg", // OGP用の画像URLを設定
//   "og:url": "https://example.com/services",
//   "twitter:card": "summary_large_image",
//   "twitter:title": "サービス内容 | [会社名]",
//   "twitter:description": "プロフェッショナルなサービス内容を紹介しています。",
//   "twitter:image": "/path-to-image.jpg",
//   "canonical": "https://example.com/services",
// };

// 型定義
type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link:string;
};

type Feature = {
  icon: React.ComponentType;
  title: string;
  description: string;
};

type IconProps = {
  className?: string;
};



// サービス配列
const services: Service[] = [
  {
    icon: Droplet,
    title: "給湯器の販売・取付",
    description: "給湯器の交換から、新規設置まで。漏水対策も万全です。",
    link:"#link01",
  },
  {
    icon: Thermometer,
    title: "トイレの販売・取付",
    description: "新製品から人気の省エネ製品まで、お客様のご要望を元にご提案します。",
    link:"#link02",
  },
  {
    icon: Home,
    title: "レンジフードの販売・取付",
    description: "キッチン設備のレンジフードは、静音・パワフルなものまで最適な製品をご案内します。",
    link:"#link03",
  },
  {
    icon: SquareSquare,
    title: "コンロの販売・取付",
    description: "便利なオール電化製品からガスコンロ・ビルトインコンロまで対応します。",
    link:"#link04",
  },
  {
    icon: Building,
    title: "取り扱いメーカー",
    description: "安心・安全、定番の人気メーカーの製品を取り揃えています。",
    link:"#link05",
  },
  {
    icon: Wrench,
    title: "トラブル対応・修理",
    description: "水回りのトラブルから住宅関連のお困りごとはご相談下さい。",
    link:"#link06",
  },
  {
    icon: ShoppingCart,
    title: "ユープラス",
    description: "住宅設備のショッピングサイト",
    link:"https://u-plus-ec.jp",
  },
];

// フィーチャー配列
const features: Feature[] = [
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



export default function Service() {

  
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
    <Heros
    id={heroData.service.id}
    title={heroData.service.title}
    subtitle={heroData.service.subtitle}
    description={heroData.service.description}
    backgroundImage={heroData.service.backgroundImage}
    primaryButton={heroData.service.primaryButton}
    secondaryButton={heroData.service.secondaryButton}
     />
    <section id="service" className="py-10 md:py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">サービス内容</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-loose">
            プロフェッショナルの技術者が、お客様の快適な暮らしをサポートします。<br />
            住宅設備のことなら、どんなことでもお任せください。
          </p>
        </div>

        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <a href={service.link} rel="noopener noreferrer" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow" onClick={(e) => {
                e.preventDefault(); // デフォルトのリンク動作を無効化
                const target = document.querySelector(service.link);
                if (target) {
                  const topOffset = target.getBoundingClientRect().top + window.scrollY; // スクロール先の位置
                  window.scrollTo({
                    top: topOffset,
                    behavior: "smooth", // スムーズスクロール
                  });

                  // カスタムスクロールの例（一定速度でスクロール）
                  // let start = window.scrollY;
                  // const step = 10; // 1フレーム毎にスクロール。
                }
              }}>
                <CardHeader>
                  {service.icon && (
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                  )}
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service?.description}</CardDescription>
                </CardContent>
              </Card>
              </a>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <a
                href={service.link}
                // URL判定で`target`と`rel`を適切に設定
                target={service.link.startsWith("http") ? "_blank" : undefined}
                rel={service.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block"
                onClick={(e) => {
                  if (service.link.startsWith("#")) {
                    // 内部リンクの場合
                    e.preventDefault();
                    const target = document.querySelector(service.link);
                    if (target) {
                      const topOffset = target.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: topOffset,
                        behavior: "smooth", // スムーズスクロール
                      });
                    }
                  }
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {service.icon && (
                      <service.icon className="h-12 w-12 text-primary mb-4" />
                    )}
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
    <section className="min-h-screen py-10 px-5 md:py-20 ">
      <div id="fh5co-services">
        <div id="link01" className="container m-auto">
          <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 py-5 md:py-10 justify-items-start">
            {/* 左側（50%） */}
            <div className="w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden ">
              <Image
                src="/img/kyuto_01.jpg"
                width={500} /* 幅を固定 */
                height={500} /* 高さを固定 */
                alt="給湯器画像"
                className="rounded-lg"
              />
            </div>

            {/* 右側（50%） */}
            <div className="col-span-2 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">01.給湯器の販売・取付工事</h2>
              <h3 className="text-lg font-semibold mb-4">従来型給湯器＜一戸建・マンション＞</h3>
              <p className="mb-4 leading-loose">
                ガス給湯器の能力は号数で表示されており、お湯の量は号数によって異なります。
                号数とは、給湯器の能力を表すもので、水温＋25℃のお湯を1分間に何リットル出すことができるかを表しています。
                たとえば水温＋25℃のお湯を1分間に24リットルのお湯を出すことのできる能力を24号といいます。
              </p>

              <h3 className="text-lg font-semibold mb-4">エコジョーズ＜一戸建・マンション＞</h3>
              <p className="mb-4 leading-loose">
                「エコジョーズ」と呼ばれる給湯器は、今まで捨てられていた不要な排熱を再利用することにより、
                従来の給湯器よりも熱効率を高めた省エネ性能の高い給湯器です。
                従来の給湯器と比較して、同じだけお湯を使っても、ガス使用量が減り、ガス代を節約できます。
              </p>
              <div className="my-10 overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">番号</th>
                      <th className="border border-gray-300 px-4 py-2">給湯器の種類</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">給湯専用</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">高温水供給</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">3</td>
                      <td className="border border-gray-300 px-4 py-2">給湯追焚オート</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">4</td>
                      <td className="border border-gray-300 px-4 py-2">暖房機能付オート</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">5</td>
                      <td className="border border-gray-300 px-4 py-2">暖房機能付フルオート</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </motion.div>

          <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="link02" className="container mx-auto py-5 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 md:py-10 justify-items-end ">
              
              <div className="col-span-2 order-2 md:order-1 ml-10 ">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">02.トイレの販売・取付工事</h2>
                <h3 className="text-lg font-semibold mb-4">一体形（便器と温水洗浄便座が一体になっているタイプ）</h3>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>給湯専用</li>
                  <li>高温水供給</li>
                  
                </ul>
                <h3 className="text-lg font-semibold mb-4">便座＆本体セット（便器、便座、タンクを組み合わせるタイプ）</h3>
                <p></p>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>給湯専用</li>
                  <li>高温水供給</li>
                  <li>給湯追焚オート</li>
                  
                </ul>
                <h3 className="text-lg font-semibold mb-4">温水洗浄便座（交換可能な温水洗浄便座）</h3>
                <p></p>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>給湯専用</li>
                  <li>高温水供給</li>
                  
                </ul>
              </div>

              <div className="order-1 md:order-2 flex justify-center items-start col-span-1  w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden  object-contain">
                  <Image
                        src="/img/toire_01.jpg"
                        width={500}
                        height={500}
                        alt="トイレ画像"
                        className="rounded-lg"
                      />

              </div>
            </div>
          </motion.div>
        
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="link03" className="container m-auto  py-5 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 md:py-10">
              {/* 画像部分 */}
              <div className="sm:flex sm:justify-center sm:items-center w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden">
                <Image
                  src="/img/renge_01.jpg"
                  width={500}
                  height={500}
                  alt="レンジフード画像"
                  className=" rounded-lg "
                />
              </div>
              {/* テキスト部分 */}
              <div className="col-span-2 order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">03.レンジフードの販売・取付工事</h2>
                <h3 className="text-lg font-semibold mb-4">フードの形状</h3>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>ブーツ型</li>
                  <li>フラット型・平型・浅型</li>
                  <li>スリム型</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">取り付けタイプ</h3>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>壁面取付けタイプ</li>
                  <li>横壁面取付けタイプ</li>
                  <li>天井取付けタイプ</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="link04" className="container m-auto  py-5 md:py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 md:py-10 justify-items-end ">
                <div className="col-span-2 order-2 md:order-1 ml-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">04.コンロの販売・取付工事</h2>
                  <h3 className="text-lg font-semibold mb-4">従来型給湯器＜一戸建・マンション＞</h3>
                
                  <p></p>
                  <ul className="list-disc ml-6 my-6 leading-loose">
                    <li>ビルトインコンロ</li>
                    <li>テーブルコンロ</li>
                    
                  </ul>
                </div>
                <div className="order-1 md:order-2 flex justify-center items-center col-span-1 w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden">
                  <div className="fh5co-icon">
                    <Image
                          src="/img/conro_01.jpg"
                          width={500}
                          height={500}
                          alt="コンロ画像"
                          className="rounded-lg"
                        />
                    </div>
                </div>
              </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="link05" className="container m-auto  py-5 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 md:py-10 ">
                {/* 画像部分 */}
              <div className="rounded-lg border border-gray-300 flex justify-center items-center w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden">
                <div className="fh5co-icon">
                  <Image
                  src="/img/maiker_01.jpg"
                  width={500}
                  height={500}
                  alt="メーカーイメージ画像"
                  className=" rounded-lg"
                        />
                </div>
              </div>
               {/* テキスト部分 */}
              <div className="col-span-2 order-2 md:order-1 ">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">05.取り扱いメーカー</h2>
              <h3 className="text-lg font-semibold mb-4">定番の人気メーカーの製品を取り揃えています。</h3>
                
                <p></p>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li><a className="iro" href="http://rinnai.jp/top" target="_blank">リンナイ</a></li>
                  <li><a className="iro" href="http://www.paloma.co.jp/product/" target="_blank">パロマ</a></li>
                  <li><a className="iro" href="http://www.noritz.co.jp/product/kyutoki/gus.html" target="_blank">ノーリツ</a></li>
                  <li><a className="iro" href="http://sumai.panasonic.jp/hp/"  target="_blank">パナソニック</a></li>
                  <li>日立</li>
                </ul>
                <div className="mt-10">             
                <ul className="flex justify-start space-x-7">
                  <li>
                    <Image
                      src="/img/site_logo.png"
                      width={110}
                      height={140}
                      alt="リンナイ"
                      className="img-responsive"
                    />
                  </li>
                  <li>
                    <Image
                      src="/img/logo_palom.png"
                      width={110}
                      height={152}
                      alt="パロマ"
                      className="img-responsive"
                    />
                  </li>
                  <li>
                    <Image
                      src="/img/logo_noritz.gif"
                      width={120}
                      height={152}
                      alt="ノーリツ"
                      className="img-responsive"
                    />
                  </li>
                  <li>
                    <Image
                      src="/img/logo_pana.png"
                      width={130}
                      height={152}
                      alt="パナソニック"
                      className="img-responsive"
                    />
                  </li>
                </ul>        
            </div>
              </div>
            </div> 
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} 
            id="link06" className="container m-auto  py-5 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-12 md:py-10 justify-items-end ">
              <div className="col-span-2 order-2 md:order-1 ml-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">06.トラブル対応・修理</h2>
                <h3 className="text-lg font-semibold mb-4">
                  給湯器のトラブルを中心にお客様のお困りごとに<br />誠心誠意、取り組んでいます。</h3>
               
                <p></p>
                <ul className="list-disc ml-6 my-6 leading-loose">
                  <li>給湯器のトラブル</li>
                  <li>温度が安定しない</li>
                  <li>蛇口の水漏れ</li>
                  <li>排水口の詰り</li>
                  <li>トイレの詰り</li>
                  
                </ul>
              </div>
              <div className="order-1 md:order-2 flex justify-center items-center col-span-1 w-auto h-auto md:max-w-[600px] md:max-h-[600px] overflow-hidden">
                <div className="fh5co-icon">
                  <Image
                        src="/mente.png"
                        width={500}
                        height={500}
                        alt="トラブル対応"
                        className="rounded-lg"
                      />
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

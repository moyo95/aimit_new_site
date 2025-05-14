// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Droplet, Thermometer, Smile, Wrench, Shield, Clock, ShieldQuestion, ShoppingBag, MessageCircleQuestion, UserRound } from "lucide-react";
// import { link } from "node:fs";
// import News from "../news/page";
// import NewsList from "./NewsList";

// const services = [
//   {
//     icon: ShoppingBag,
//     title: "ユープラス",
//     description: "アイミット株式会社が運営する住宅設備関連の商品と取り扱うECサイトです。",
//     link: "https://u-plus-ec.jp" ,
//     target: "_blank",
//   },
//   {
//     icon: Wrench,
//     title: "取付工事（施工事例）",
//     description: "取付工事のご依頼実績。",
//     link: "/services/gallery"
//   },
//   {
//     icon: UserRound,
//     title: "求人情報",
//     description: "未来を切り開くために、技術を磨いてみませんか。",
//     link: "/recruit",
//   },
//   {
//     icon: MessageCircleQuestion,
//     title: "よくある質問",
//     description: "お客様より頻繁に頂くご質問などをまとめています。",
//     link: "/questions",
//   },
// ];

// const features = [
//   {
//     icon: Shield,
//     title: "安心の保証制度",
//     description: "工事後1年間の保証付き。アフターフォローも万全です。",
//   },
//   {
//     icon: Clock,
//     title: "迅速な対応",
//     description: "緊急時は最短30分で現場に到着。素早い対応を心がけています。",
//   },
// ];

// const ITEMS_PER_PAGE = 1;

// export default function Services() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//     },
//   };

//   return (
//     <section id="services" className=" md:pb-20 bg-gray-50 relative h-auto md:h-screen">
//        {/* <News showAll={false} withWrapper={false} /> */}
//        <NewsList showAll={false} />
//       <div className="py-10 md:pb-20 bg-gray-50 relative h-auto md:h-screen flex items-center">
        
//         <div className="container mx-auto px-4 mb-10 md:mb-20">
//           <div className="md:text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-snug md:leading-loose">給湯器 / ガス給湯器の販売 / 取付工事を行っている、<br />アイミット株式会社です。</h2>
//             <h3 className="text-1xl text-gray-600 max-w-2xl mx-auto leading-loose">
//             安心の責任施工と確かな実績で、名古屋市内のエリアに対応させて頂いています。
//             ご購入・機器設置や修理はアイミットに是非お任せ下さい。
//               プロフェッショナルの技術者が、お客様の快適な暮らしをサポートします。
//               住宅設備のことなら、どんなことでもお任せください。
//             </h3>
//           </div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
//           >
//             {services.map((service, index) => (
//               <motion.div key={index} variants={itemVariants}>
//                 <Card className="h-full hover:shadow-lg transition-shadow">
//                   <CardHeader>
//                   <a href={service.link || "#"}
//                   target={service.link.startsWith("http") ? "_blank" : undefined} 
//                   className="no-underline hover:underline"
//                   rel={service.link.startsWith("http") ? "noopener noreferrer" : undefined}
//                   >
//                     <service.icon className="h-12 w-12 text-primary mb-4" />
//                     <CardTitle>{service.title}</CardTitle>
//                     </a>
//                   </CardHeader>
//                   <CardContent>
//                     <CardDescription>{service.description}</CardDescription>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//               >
//                 <Card className="bg-primary text-primary-foreground">
//                   <CardHeader>
//                     <feature.icon className="h-8 w-8 mb-4" />
//                     <CardTitle>{feature.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p>{feature.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Thermometer, Smile, Wrench, Shield, Clock, ShieldQuestion, ShoppingBag, MessageCircleQuestion, UserRound } from "lucide-react";
import { link } from "node:fs";
import News from "../news/page";
import { useEffect, useState } from "react";
import NewsList, { NewsItem } from "./NewsList";

const services = [
  {
    icon: ShoppingBag,
    title: "ユープラス",
    description: "アイミット株式会社が運営する住宅設備関連の商品と取り扱うECサイトです。",
    link: "https://u-plus-ec.jp",
    target: "_blank",
  },
  {
    icon: Wrench,
    title: "取付工事（施工事例）",
    description: "取付工事のご依頼実績。",
    link: "/services/gallery",
  },
  {
    icon: UserRound,
    title: "求人情報",
    description: "未来を切り開くために、技術を磨いてみませんか。",
    link: "/recruit",
  },
  {
    icon: MessageCircleQuestion,
    title: "よくある質問",
    description: "お客様より頻繁に頂くご質問などをまとめています。",
    link: "/questions",
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

const ITEMS_PER_PAGE = 1; // Services コンポーネントで表示するニュースの件数

export default function Services() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNewsForServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/news?per_page=${ITEMS_PER_PAGE}`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          const message = `ニュースの取得に失敗しました: ${response.status}`;
          setError(message);
          throw new Error(message);
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        console.error("Services コンポーネントでの最新ニュース取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNewsForServices();
  }, []);

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
    <section id="services" className=" bg-gray-50 relative h-auto ">
      <div className="container ">
        <div className="text-center">
          {loading ? (
            <p>Loading latest news...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            // <NewsList showAll={false} newsItems={newsItems} />md:h-screen
            <NewsList showAll={false} newsItems={newsItems} variant="single" />
          )}
        </div>
      </div>
      <div className="py-10 md:pb-20 bg-gray-50 relative h-auto md:h-screen flex items-center">
        <div className="container mx-auto my-20 px-4 mb-10 md:mb-20">
          <div className="md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-snug md:leading-loose">
              給湯器 / ガス給湯器の販売 / 取付工事を行っている、<br />アイミット株式会社です。
            </h2>
            <h3 className="text-1xl text-gray-600 max-w-2xl mx-auto leading-loose">
              安心の責任施工と確かな実績で、名古屋市内のエリアに対応させて頂いています。
              ご購入・機器設置や修理はアイミットに是非お任せ下さい。
              プロフェッショナルの技術者が、お客様の快適な暮らしをサポートします。
              住宅設備のことなら、どんなことでもお任せください。
            </h3>
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
                    <a
                      href={service.link || "#"}
                      target={service.link?.startsWith("http") ? "_blank" : undefined}
                      className="no-underline hover:underline"
                      rel={service.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <service.icon className="h-12 w-12 text-primary mb-4" />
                      <CardTitle>{service.title}</CardTitle>
                    </a>
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
      </div>
    </section>
  );
}
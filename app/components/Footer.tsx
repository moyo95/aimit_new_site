"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Phone } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 overflow-x-hidden max-w-full ">
      <div className="md:mx-auto px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-2">アイミット株式会社</h2>
            <p className="md:flex block"><span className="inline-block md:mr-2">〒 462-0810 </span><span className="inline-block">愛知県名古屋市北区山田１丁目１６−１２</span></p>
            <p className="mb-2 mt-1 flex items-center">
              <Phone className="h-4 w-4 mr-1" /><a>052-934-7831</a>
              <span className="ml-3">( 9:00~18:00 )</span>
            </p>
            <p className="mb-4">
              快適な暮らしをサポートする住宅設備のプロフェッショナル。<br />
              お客様の「困った」を解決いたします。今すぐお電話下さい！
            </p>
            <div className="flex justify-start space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
  
          <div className="flex gap-12 justify-start md:justify-end">
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors">
                    サービス
                  </a>
                </li>
                <li>
                  <a href="/services/gallery" className="hover:text-white transition-colors">
                    施工事例
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href="/recruit" className="hover:text-white transition-colors">
                    採用情報
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="/https://u-plus-ec.jp" className="hover:text-white transition-colors">
                    ショッピング
                  </a>
                </li>
                <li>
                  <a href="/questions" className="hover:text-white transition-colors">
                    よくある質問
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* トップへ戻るリンク */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0, // ページの一番上
                behavior: "smooth", // スムーズスクロール
              });
            }}
            className="text-white hover:text-black !no-underline transition-colors  bg-red-500 rounded-full px-6 py-2"
          >
            トップへ戻る
          </button>
        </div>

  
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm">&copy; 2024 AIMIT CO,LTD All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
  
}
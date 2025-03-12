"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">アイミット株式会社</h2>
            <p className="mb-4">
              快適な暮らしをサポートする住宅設備のプロフェッショナル。<br />
              24時間365日、お客様の「困った」を解決いたします。
            </p>
            <div className="flex space-x-4 mt-6">
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

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  給排水設備
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  空調設備
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  住宅設備
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  修理・メンテナンス
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  採用情報
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2024 AIMIT CO,LTD All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
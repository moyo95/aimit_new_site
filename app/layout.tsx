import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import SessionProviderWrapper from './components/SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export const metadata = {
  title: "アイミット株式会社 - 名古屋市で安心と実績",
  description: "名古屋市での住宅設備のプロフェッショナルサービスを提供するアイミット株式会社の公式サイト。",
  robots: "noindex, follow",
  author: "アイミット株式会社",
};


export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ja">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "会社名",
              "url": "https://aimit.jp",
              "description": "会社全体に関する説明を記載。",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
      
          {/* <body className={inter.className.replace('vsc-initialized', '').trim()}> */}
          <SessionProviderWrapper>
            <Navbar />
              {children}
            <Footer />
          </SessionProviderWrapper>
        </body>
    </html>
  );
}
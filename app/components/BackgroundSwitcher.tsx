import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

const BackgroundSwitcher = () => {
  const [currentImage, setCurrentImage] = useState(0); // 現在表示中の画像インデックス

  // useMemoでimagesを固定
  const images = useMemo(() => ["/phot1.jpg", "/phot7.jpg", "/phot2.jpg","/phot8.jpg"], []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length); // 次の画像へインデックスを更新
    }, 10000); // 5秒ごとに切り替え
    return () => clearInterval(interval);
  }, [images]); // useMemoされたimagesを依存に追加

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence>
        {/* 背景画像を切り替え */}
        <motion.div
          key={images[currentImage]} // 画像ごとにユニークなキーを設定
          initial={{ opacity: 0, scale: 1.2 }} // 最初はズームイン＆透明
          animate={{ opacity: 1, scale: 1 }} // 表示状態で完全表示＆拡大解除
          exit={{ opacity: 0, scale: 1.1 }} // 退場時にズームアウト＆透明化
          transition={{ duration: 1 }} // アニメーションの速度を設定
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className="absolute inset-0 bg-black/40" /> {/* 黒のオーバーレイ */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundSwitcher;

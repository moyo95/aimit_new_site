"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Modal from "react-modal";
import Heros from "../../components/Heros";
import heroData from "../../../public/data/heroData.json";



export default function ProjectGallery() {
  // モーダルで使用する画像の状態
  const [modalImage, setModalImage] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]); // 動的に取得する画像リスト

  // モーダルを開く関数
  const openModal = (imagePath: string) => {
    setModalImage(imagePath);
    setModalOpen(true);
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalImage(""), 300); // アニメーション終了後にリセット
  };

  // 画像をサーバーから取得する関数
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/get-images"); // APIから画像リストを取得
      const data = await res.json();
      setImages(data.images); // 画像データを状態に保存
    };
    fetchImages();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // 初期状態
    visible: { opacity: 1, scale: 1 }, // 表示時
    exit: { opacity: 0, scale: 0.8 }, // 閉じる際
  };

  return (
    <>
      <Heros
      id={heroData.project.id}
      title={heroData.project.title}
      subtitle={heroData.project.subtitle}
      description={heroData.project.description}
      backgroundImage={heroData.project.backgroundImage}
      primaryButton={heroData.project.primaryButton}
      secondaryButton={heroData.project.secondaryButton}
      />
      <section id="services" className="py-20 bg-gray-50  md:min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-10">施工事例</h2>
            <h3 className="text-1xl text-gray-600 max-w-2xl mx-auto leading-loose">
              名古屋市内のエリアに中心に施工させて頂いた、ビフォーアフターを掲載しています。
              給湯器から住宅設備のご用命は、アイミット株式会社へお任せ下さい。
            </h3>
          </div>

          {/* ギャラリーのグリッドレイアウト */}
          <motion.div
            variants={containerVariants}
            initial="hidden" // 初期状態
            animate="visible" // 表示状態
            exit="exit" // 非表示状態（モーダルを閉じる際）
            transition={{ duration: 0.6 }} // アニメーションの速度を指定
            // viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mx-12"
          >
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => openModal(image)} // クリックでモーダルを表示
                className="cursor-pointer hover:opacity-80"
              >
                <Image
                  src={image} // 動的に取得した画像パス
                  alt={`Service ${index}`}
                  layout="responsive"
                  width={16} // アスペクト比
                  height={9}
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </motion.div>

          {/* モーダル */}
          <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
              className="fixed inset-0 flex items-center justify-center"
              overlayClassName="fixed inset-0 bg-black bg-opacity-80"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }} // 少し長めに変更
                // className="relative bg-white p-4 rounded shadow-md max-w-3xl"
                className="relative bg-white p-4 rounded shadow-md max-w-3xl w-full"
              >
                {modalImage && (
                  <Image
                    src={modalImage}
                    alt="拡大表示"
                    width={700}
                    height={500}
                    className="w-[100%] max-w-full max-h-full"
                  />
                )}
                <button onClick={closeModal} className="px-3 absolute top-2 right-2 text-gray-600 bg-gray-200 border rounded-full p-1 hover:bg-gray-100">
                  閉じる
                </button>
              </motion.div>
            </Modal>

        </div>
      </section>
    </>
  );
}

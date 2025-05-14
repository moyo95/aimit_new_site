// components/Modal.tsx
// import React, { memo } from 'react';

// interface ModalProps {
//   show: boolean;
//   onClose: () => void;
//   content: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = memo(({ show, onClose, content }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-5 rounded-lg">
//         {content}
//         <button onClick={onClose}>閉じる</button>
//       </div>
//     </div>
//   );
// });

// Modal.displayName = 'Modal'; // displayNameプロパティを追加

// export default Modal;

import React, { FC, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from '../components/Modal.module.css';
interface ModalProps {
  children?: React.ReactNode; // childrenをオプションに変更
  show: boolean;
  onClose: () => void;
  content: string;
}

const Modal: FC<ModalProps> = React.memo(({ show, onClose, content }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // フェードアウトアニメーション開始
    setTimeout(() => {
      setIsClosing(false); // 状態をリセット
      onClose(); // モーダルを非表示にする
    }, 300); // CSSのアニメーション時間に合わせる
  };

  if (!show && !isClosing) return null; // 非表示時はレンダリングしない

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}
      onClick={handleClose} // 背景クリックでモーダルを閉じる
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // モーダル内クリックでイベント伝播を停止
      >
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>,
    document.body // モーダルを <body> に描画
  );
});

// displayNameを明示的に追加
Modal.displayName = "Modal";

export default Modal;
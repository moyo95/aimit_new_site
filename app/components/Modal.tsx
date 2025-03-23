// import React, { FC, useState } from 'react';
// import styles from '../components/Modal.module.css';

// interface ModalProps {
//   show: boolean;
//   onClose: () => void;
//   content: string;
// }

// const Modal: FC<ModalProps> = ({ show, onClose, content }) => {
//   const [isClosing, setIsClosing] = useState(false);

//   const handleClose = () => {
//     setIsClosing(true); // フェードアウトアニメーション開始
//     setTimeout(() => {
//       setIsClosing(false); // 状態をリセット
//       onClose(); // モーダルを非表示にする
//     }, 300); // CSSのアニメーション時間に合わせる
//   };

//   if (!show && !isClosing) return null; // 非表示時はレンダリングしない

//   return (
//     <div className={styles.modal} onClick={handleClose}>
//       <div
//         className={`${styles.modalContent} ${isClosing ? styles.modalClosing : ''}`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <span className={styles.close} onClick={handleClose}>
//           &times;
//         </span>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React, { FC, useState } from 'react';
import styles from '../components/Modal.module.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  content: string;
}

const Modal: FC<ModalProps> = ({ show, onClose, content }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // フェードアウトアニメーション開始
    setTimeout(() => {
      setIsClosing(false); // 状態をリセット
      onClose(); // モーダルを非表示にする
    }, 300); // CSSのアニメーション時間に合わせる
  };

  // モーダルが表示されていない時にnullを返す
  if (!show && !isClosing) return null;

  return (
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
    </div>
  );
};

export default Modal;

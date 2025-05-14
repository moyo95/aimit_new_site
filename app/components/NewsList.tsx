// "use client";
// import '../globals.css';
// import { useState, useEffect } from "react";
// import Image from "next/image"; // 追加
// import Link from "next/link";

// interface NewsItem {
//   id: number;
//   date: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   image_url: string;
//   isRecent: boolean; // 追加
// }

// interface NewsListProps {
//   showAll: boolean;
//   className?: string; // 追加
//   itemClassName?: string; // 追加
//   h2ClassName?: string; // 追加
//   baceClassName?: string;
// }

// const NewsList = ({ showAll, className,itemClassName, h2ClassName, baceClassName }: NewsListProps) => { // props を受け取る
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch("/api/news");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("取得したデータ:", data);
//         setNews(data);
//       } catch (err: any) {
//         console.error("ニュースの取得に失敗しました:", err);
//         setError(`ニュースの取得に失敗しました: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);



//   const filteredNews = showAll ? news : news.slice(0, 1);
//   console.log("Filtered News:", filteredNews);

//   if (loading) return <p className='flex justify-center py-10 mx-auto'>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={className || "flex flex-col w-screen p-3 md:p-6 original-gradient"}>
//       <div className={itemClassName ||"md:flex justify-center items-center min-w-full mx-auto"}>
//       <h2 className={
//         h2ClassName ||"font-bold text-xl md:text-2xl mr-5 md:mb-0 mb-2"
//       }>
//         News 
//         <span className='mx-2 h-[18px] inline-block border-l-2 border-black'></span>
//       Topic</h2>
//       {filteredNews.length > 0 ? (
//         filteredNews.map((newsItem) => (
//           <div
//             key={newsItem.id}
//             className={baceClassName ||"border border-gray-500 rounded-lg p-2 flex items-center gap-2 md:gap-5 md:w-1/2"}
//           >
//             {newsItem.image_url && (
//           <Image
//             src={newsItem.image_url}
//             alt={newsItem.title}
//             width={80}
//             height={30}
//             style={{ objectFit: "cover", width: "50px", height: "50px" }} 
//           />
//         )}
//             <p className="text-sm text-gray-500">
//               {/* {new Intl.DateTimeFormat("ja-JP").format(new Date(newsItem.date))} */}
//               {new Intl.DateTimeFormat("ja-JP").format(new Date(newsItem.date))}
//             </p>
//             <Link href={`/news/${newsItem.id}`}>
//             <h2 className="text-sm font-normal text-gray-500">
//               {newsItem.isRecent && <span role="img" aria-label="キラキラ">✨</span>} {/* キラキラアイコンを表示 */}
//               {newsItem.title}
//             </h2>
//             </Link>
        
//             {/* <h2 className="text-lg font-semibold">{newsItem.title}</h2> */}
//             {/* <p className="mt-2">{newsItem.content}</p> */}
//           </div>    
//         ))
//       ) : (
//         <p>現在、ニュースはありません。</p>
//       )}
//       </div>
//     </div>
//   );
// };

// export default NewsList;


// components/NewsList.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image_url?: string | null;
  isRecent: boolean; // 追加

}

interface NewsListProps {
  newsItems: NewsItem[];
  showAll?: boolean;
  variant?: 'list' | 'single'; // 'list' (一覧) または 'single' (1件)
  className?: string;
  h2ClassName?: string;
  itemClassName?: string;
  baceClassName?: string;
}

const NewsList: React.FC<NewsListProps> = ({
  newsItems,
  showAll = true, // デフォルト値を true に設定
  variant = 'list', // デフォルトは 'list'
  className,
  h2ClassName,
  itemClassName,
  baceClassName,
}) => {
  // showAll が false の場合は最初の1件のみ表示、true の場合は全て表示
  const itemsToRender = showAll ? newsItems : newsItems.slice(0, 1);


  return (
    <div className={className}>
      {/* <h2 className={h2ClassName}>最新ニュース</h2> */}
      <ul>
        {itemsToRender.map((item) => (
          <li key={item.id} className={itemClassName}>
            {variant === 'list' ? (
              <Link href={`/news/${item.id}`} className={baceClassName}>
                {item.image_url && (
                  <div className={`relative overflow-hidden rounded-md shadow-md w-32 h-20`}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="flex-colom py-2 px-4 gap-2 items-center md:leading-loose">
                 
                  <div className={`text-gray-500 text-sm flex items-center gap-1`}>
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                    {item.isRecent && <span role="img" aria-label="キラキラ">✨</span>} {/* 各 item の isRecent を確認 */}
                  </div>
                  <h3 className={`font-base text-sm text-gray-500`}>{item.title}</h3>
                  
                  {/* <p className="text-gray-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: item.excerpt }} /> */}
                </div>
              </Link>
            ) : (
              <div className={className || "flex flex-col w-screen p-3 md:p-6 original-gradient"}>
                <div className={itemClassName ||"md:flex justify-center items-center min-w-full mx-auto"}>
                  <h2 className={
                    h2ClassName ||"font-bold text-xl md:text-2xl mr-5 md:mb-0 mb-2"
                  }>
                    News
                    <span className='mx-2 h-[18px] inline-block border-l-2 border-black'></span>
                    Topic
                  </h2>
                  <div className="flex py-2 px-4 gap-2 items-center border bg-white border-bg-gray-600 w-1/2 rounded-md md:leading-loose">
                    <div className={`text-gray-500 text-sm flex items-center gap-1`}>
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString()}
                      {item.isRecent && <span role="img" aria-label="キラキラ">✨</span>} {/* 各 item の isRecent を確認 */}
                    </div>
                    <Link href={`/news/${item.id}`} className="text-base hover:underline"> {/* タイトルのみをリンクにする */}
                      <h3 className={`text-sm text-gray-500`}>{item.title}</h3>
                    </Link>
                  </div>
                  {/* <p className={`text-gray-700 text-base`} dangerouslySetInnerHTML={{ __html: item.excerpt }} /> */}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
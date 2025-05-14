"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserRole } from "@/hooks/useUserRole";
import Heros from "../../components/Heros";
import heroData from "../../../public/data/heroData.json";
import { useSearchParams } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

// 🔽 Suspense 内で使うコンポーネント
const SearchParamHandler = ({ onReceivePostId }: { onReceivePostId: (id: string | null) => void }) => {
  const searchParams = useSearchParams();
  const postId = searchParams?.get("id") ?? null;
  useEffect(() => {
    onReceivePostId(postId);
  }, [postId, onReceivePostId]);
  return null;
};

const NewsForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const roles = useUserRole();

  const [postId, setPostId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [contentImages, setContentImages] = useState<File[]>([]);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(heroData.form.backgroundImage);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const username = process.env.NEXT_PUBLIC_WORDPRESS_USERNAME!;
  const applicationPassword = process.env.NEXT_PUBLIC_WORDPRESS_APP_PASSWORD!;
  const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE;

  if (!WP_API_BASE) {
    throw new Error("NEXT_PUBLIC_WP_API_BASE is not defined in environment variables");
  }

  const generateAuthHeader = () =>
    `Basic ${typeof window !== "undefined" ? btoa(`${username}:${applicationPassword}`) : ""}`;

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?login=true");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${WP_API_BASE}/categories`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error("カテゴリデータが配列ではありません");
        }
      } catch (err) {
        console.error("カテゴリの取得に失敗しました", err);
        setError("カテゴリの取得に失敗しました");
      }
    };

    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${WP_API_BASE}/posts/${postId}`, {
          headers: { Authorization: generateAuthHeader() },
        });

        if (!response.ok) throw new Error("投稿の取得に失敗しました");

        const data = await response.json();
        setTitle(data.title.rendered);
        setContent(data.content.rendered.replace(/<[^>]+>/g, ""));
        setSelectedCategories(data.categories || []);

        if (data.featured_media) {
          const mediaRes = await fetch(`${WP_API_BASE}/media/${data.featured_media}`);
          if (mediaRes.ok) {
            const media = await mediaRes.json();
            setFeaturedImageUrl(media.source_url);
          }
        }
      } catch (err) {
        console.error(err);
        setError("投稿の取得中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchPost();
  }, [postId, status]);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const uploadImage = async (image: File, token: string) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", image.name);
    formData.append("alt_text", "投稿画像");

    try {
      const res = await fetch(`${WP_API_BASE}/media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      return { id: data.id, url: data.source_url };
    } catch (err) {
      console.error("画像アップロード失敗:", err);
      setError("画像アップロード中にエラーが発生しました。");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session || !session.user?.token) {
      setError("ログイン情報が取得できません。再度ログインしてください。");
      return;
    }

    const token = session.user.token;

    if (isTokenExpired(token)) {
      setError("ログイントークンの有効期限が切れています。再度ログインしてください。");
      return;
    }

    try {
      let featuredMediaId = null;
      let contentImageHTMLs: string[] = [];

      if (image) {
        const uploaded = await uploadImage(image, token);
        if (!uploaded) return;
        featuredMediaId = uploaded.id;
      }

      for (const img of contentImages) {
        const uploaded = await uploadImage(img, token);
        if (uploaded) {
          contentImageHTMLs.push(`<img src="${uploaded.url}" />`);
        }
      }

      const postData = {
        title,
        content: `${content}<br/>${contentImageHTMLs.join("<br/>")}`,
        status: "publish",
        categories: selectedCategories,
        ...(featuredMediaId && { featured_media: featuredMediaId }),
      };

      const method = postId ? "PATCH" : "POST";
      const url = postId
        ? `${WP_API_BASE}/posts/${postId}`
        : `${WP_API_BASE}/posts`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      alert(postId ? "投稿を更新しました！" : "投稿が完了しました！");
      router.push(`/news/${data.id}`);
    } catch (err) {
      console.error("投稿エラー:", err);
      setError("投稿中にエラーが発生しました。");
    }
  };

  if (status === "loading" || loading) {
    return <p className="text-center my-10">読み込み中...</p>;
  }

  if (status === "authenticated" && session?.user?.role !== "admin") {
    return (
      <p className="text-center my-10 text-red-500">
        あなたにはこのページへのアクセス権がありません。
      </p>
    );
  }

  return (
    <>
      <Heros {...heroData.newpost} />

      {/* Suspense で searchParam 処理を包む */}
      <Suspense fallback={null}>
        <SearchParamHandler onReceivePostId={(id) => setPostId(id)} />
      </Suspense>

      <section className="py-10 md:py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 my-10 md:my-20">
          {error && <p className="text-red-500">{error}</p>}
          <form
            className="mx-auto max-w-lg bg-white shadow-lg p-8 rounded-lg space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block font-bold mb-2">タイトル</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">本文</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">カテゴリ</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onChange={(e) => {
                        const id = parseInt(e.target.value, 10);
                        toggleCategory(id);
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">アイキャッチ画像</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label className="block font-bold mb-2">本文内画像（複数可）</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setContentImages(e.target.files ? Array.from(e.target.files) : [])
                }
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {loading ? "送信中..." : postId ? "更新する" : "投稿する"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsForm;

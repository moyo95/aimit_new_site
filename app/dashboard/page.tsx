"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import Heros from "../components/Heros";
import heroData from "../../public/data/heroData.json";


const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // console.log("セッション状態:", status);
    // console.log("セッション内容:", session);

    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div style={{ textAlign: "center", display:"flex", alignItems:"center", height: "calc(100vh - 300px)", justifyContent:"center" }}>
      {session?.user ? (
        <div className="">
          <h1 className="text-xl font-bold mb-4">ようこそ、{session.user?.name || "ゲスト"}さん！</h1>
          <UserInfo />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <p>未ログイン</p>
      )}
    </div>
    </>
  );
};

export default DashboardPage;

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;
    const authorizationEndpoint = process.env.YOUR_AUTHORIZATION_ENDPOINT;

    // console.log("clientId:", clientId);
    // console.log("clientSecret:", clientSecret);
    // console.log("redirectUri:", redirectUri);
    // console.log("code:", code);

    if (!clientId || !clientSecret || !redirectUri || !authorizationEndpoint) {
      // console.error("環境変数が設定されていません。");
      return NextResponse.json(
        { error: "環境変数が設定されていません。" },
        { status: 500 }
      );
    }

    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("client_id", clientId);
    body.append("client_secret", clientSecret);
    body.append("redirect_uri", redirectUri);

    // console.log("body:", body.toString());

    const response = await fetch(authorizationEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    // console.log("response status:", response.status);
    // console.log("response statusText:", response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `アクセストークンの取得に失敗しました: ${response.status} ${response.statusText}`,
        errorData
      );
      return NextResponse.json(
        {
          error: "アクセストークンの取得に失敗しました。",
          details: errorData,
        },
        { status: 500 }
      );
    }

    try {
      const data = await response.json(); // 一度だけ呼び出す
      // console.log("response data:", data);

      if (!data.access_token) {
        console.error("アクセストークンがレスポンスに含まれていません。", data);
        return NextResponse.json(
          { error: "アクセストークンがレスポンスに含まれていません。", details: data },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (jsonError) {
      // JSON解析エラーの場合
      const text = await response.text(); // 一度だけ呼び出す
      console.error("JSON解析エラー:", jsonError, "レスポンステキスト:", text);
      return NextResponse.json(
        { error: "レスポンスのJSON解析に失敗しました。", details: text },
        { status: 500 }
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("アクセストークン取得エラー:", err.message);
      return NextResponse.json(
        { error: `アクセストークンの取得中にエラーが発生しました: ${err.message}` },
        { status: 500 }
      );
    } else {
      console.error("不明なエラーが発生しました。", err);
      return NextResponse.json(
        { error: "不明なエラーが発生しました。", details: err },
        { status: 500 }
      );
    }
  }
}
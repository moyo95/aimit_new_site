const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 4000;

// 環境変数
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID; // 実際のIDを記載
const RANGE = "post!A2:C10"; // 必要な範囲
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY; // 実際のキーを記載

// 接続処理
io.on("connection", async (socket) => {
  console.log("クライアントが接続しました");

  // Google Sheets APIからデータを取得
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.values; // スプレッドシートのデータ

    // データをクライアントに送信
    socket.emit("updateData", data);
    console.log("データ送信:", data);
  } catch (error) {
    console.error("スプレッドシートデータ取得エラー:", error.response?.data || error.message);
  }

  // クライアント切断時の処理
  socket.on("disconnect", () => {
    console.log("クライアントが切断されました");
  });
});

// サーバー起動
server.listen(PORT, () => {
  console.log(`サーバーが起動しました。http://localhost:${PORT}`);
});

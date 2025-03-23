import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SpreadsheetData: React.FC = () => {
  const [data, setData] = useState<string[][]>([]); // 配列の型を定義
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const RANGE = "post!A2:C2";
  const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;;
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000"; // フォールバックとしてデフォルト値を設定
  
  useEffect(() => {
    // useEffect内でソケットインスタンスを作成
    const socket: Socket = io(SOCKET_URL);

    socket.on("updateData", (newData: string[][]) => {
      setData(newData); // サーバーから受け取ったデータを更新
    });

    // クリーンアップ処理
    return () => {
      socket.disconnect();
      console.log("ソケットが切断されました");
    };
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  return (
    <div>
      <h1>リアルタイム更新 (Webhookベース)</h1>
      <table>
        <thead>
          <tr>
            <th>列1</th>
            <th>列2</th>
            <th>列3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetData;

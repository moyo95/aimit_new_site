// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface GoogleSheetResponse {
//   values: string[][];
// }

// const SpreadsheetData: React.FC = () => {
//   const [data, setData] = useState<string[][]>([]); // 2次元配列の型を定義
//   const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
//   const RANGE = "post!A2:C2";
//   const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
//       try {
//         const response = await axios.get<GoogleSheetResponse>(url); // レスポンスの型を指定
//         setData(response.data.values); // データを状態に保存
//       } catch (error) {
//         console.error("データ取得エラー:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>スプレッドシートのデータ</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>列1</th>
//             <th>列2</th>
//             <th>列3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SpreadsheetData;
"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SpreadsheetData: React.FC = () => {
  const [data, setData] = useState<string[][]>([]); // データを格納する状態
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000"; // サーバーURL

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    // データ受信イベント
    socket.on("updateData", (newData: string[][]) => {
      setData(newData); // サーバーから受け取ったデータを保存
      console.log("受信データ:", newData);
    });

    // クリーンアップ処理
    return () => {
      socket.disconnect();
      console.log("ソケットが切断されました");
    };
  }, []);

  return (
    <div>
      <h1>スプレッドシートのデータ</h1>
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

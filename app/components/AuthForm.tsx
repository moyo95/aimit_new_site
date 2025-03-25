// const AuthForm = () => {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h1>ログイン</h1>
//         <form>
//           <input type="email" placeholder="メールアドレス" style={{ marginBottom: "10px", padding: "8px", width: "100%" }} />
//           <input type="password" placeholder="パスワード" style={{ marginBottom: "10px", padding: "8px", width: "100%" }} />
//           <button type="submit" style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px" }}>
//             ログイン
//           </button>
//         </form>
//       </div>
//     );
//   };
  
//   export default AuthForm;

import React from "react";

const AuthForm = () => {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("ログイン処理開始"); // Insert your login logic here
  };

  return (
    <form onSubmit={handleLogin} 
    className="">
      <h1>ログイン</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        required
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <input
        type="password"
        placeholder="パスワード"
        required
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        ログイン
      </button>
      
    </form>
  );
};

export default AuthForm;

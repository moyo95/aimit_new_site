import React from "react";
import Image from "next/image";

const Logo = React.memo(() => {
  return (
    <a href="/">
      <Image
        src="/logo2.png"
        alt="Logo"
        width={245}
        height={113}
        style={{ width: "100px", height: "auto" }}
        priority
        className="rounded-md"
      />
    </a>
  );
});

export default Logo;

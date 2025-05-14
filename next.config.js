/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true,
    domains: ["example.com"], // 外部ドメインを許可
   }, 
  eslint: {
    ignoreDuringBuilds: true, // ビルド時にESLintエラーを無視
  },
  // experimental: {
  //   reactRefresh: true,
  // },
  // output: 'export',
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // images: { unoptimized: true },
  env: {
    REACT_APP_SOCKET_URL: process.env.REACT_APP_SOCKET_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  experimental: {
    optimizeCss: true,
  },
  productionBrowserSourceMaps: false,
  
};


module.exports = nextConfig;
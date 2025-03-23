/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true }, // 必要に応じて画像最適化を無効化
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
};


module.exports = nextConfig;
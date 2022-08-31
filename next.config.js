/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["av.sc.com", "postimg.cc", "i.postimg.cc"],
  },
};

module.exports = nextConfig;

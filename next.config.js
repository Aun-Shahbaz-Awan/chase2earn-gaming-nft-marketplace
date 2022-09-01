/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "av.sc.com",
      "postimg.cc",
      "i.postimg.cc",
      "gateway.pinata",
      "gateway.pinata.cloud",
    ],
  },
  env: {
    moralisKey:
      "lEgC4FuVemuR3VBs9GTduYZjNWf5TNB5yWVPOc8mE76MZmFISj0mizqNmmZcKJUV",
  },
};

module.exports = nextConfig;

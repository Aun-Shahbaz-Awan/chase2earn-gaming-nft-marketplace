/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
    Alchemy_Key: "_-9LnnqA4wFFqR-M8fxquvtbRS_tJBfP",
    chain_id: 4,
    // baseURL: "http://localhost:8000/api/v1"
    baseURL: "https://nft.chase2earn.com/api/v1",
  },
};

module.exports = nextConfig;

import React from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { ERC721Address, MKPlaceAddress } from "../contract/addresses";
import { ERC721ABI, MKPlaceABI } from "../contract/abis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUs from "../components/home/AboutUs";
import Hero from "../components/home/Hero";
import PublicNFTSale from "../components/home/PublicNFTSale";

export default function Home() {
  const { data: signer } = useSigner();
  let NFTContract,
    MKPContract = "";
  if (signer) {
    NFTContract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
    MKPContract = new ethers.Contract(MKPlaceAddress, MKPlaceABI, signer);
  }
  return (
    <>
      <div className="relative bg-[url('/assets/main/Hero_Background.png')] bg-no-repeat bg-cover h-screen">
        <div className="absolute bg-[url('/assets/main/Hero_Background_Overlay.png')] bg-no-repeat bg-cover h-screen w-full">
          <Navbar />
          <Hero />
          <PublicNFTSale
            signer={signer}
            NFTContract={NFTContract}
            MKPContract={MKPContract}
          />
          <AboutUs />
          <Footer />
        </div>
      </div>
    </>
  );
}

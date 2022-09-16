import React from "react";
import { ethers } from "ethers";
import { useSigner, useAccount } from "wagmi";
import {
  ERC20Address,
  ERC721Address,
  MKPlaceAddress,
} from "../contract/addresses";
import { ERC20ABI, ERC721ABI, MKPlaceABI } from "../contract/abis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUs from "../components/home/AboutUs";
import Hero from "../components/home/Hero";
import PublicNFTSale from "../components/home/PublicNFTSale";
import BuyTokenModal from "../components/utils/BuyTokensPopup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [buyTokensModel, setBuyTokensModel] = React.useState({
    openStatus: false,
    tokens: 0,
  });
  let TKNContract,
    NFTContract,
    MKPContract = "";
  if (signer) {
    TKNContract = new ethers.Contract(ERC20Address, ERC20ABI, signer);
    NFTContract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
    MKPContract = new ethers.Contract(MKPlaceAddress, MKPlaceABI, signer);
  }
  const handleBuyTokens = () => {
    TKNContract.mint(address, buyTokensModel.tokens)
      .then((response) => {
        toast.promise(
          response
            .wait()
            .then((tx) => {
              console.log("Buy Tx:", tx);
              console.log("ERC20 Balance:", TKNContract.balanceOf(address));
            })
            .catch((error) => {
              console.log("Transaction Error:", error);
            }),
          {
            pending: "Buying in Process...",
            success: "Buy TTL Successfully!",
          }
        );
      })
      .catch((error) => {
        console.log("Calling Func Error:", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <BuyTokenModal
        handleBuyTokens={handleBuyTokens}
        buyTokensModel={buyTokensModel}
        setBuyTokensModel={setBuyTokensModel}
      />
      <div className="relative bg-[url('/assets/main/Hero_Background.png')] bg-no-repeat bg-cover h-screen">
        <div className="absolute bg-[url('/assets/main/Hero_Background_Overlay.png')] bg-no-repeat bg-cover h-screen w-full">
          <Navbar />
          <Hero setBuyTokensModel={setBuyTokensModel} />
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

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useSigner, useAccount } from "wagmi";
import { ERC721Address } from "./../../../contract/addresses";
import { ERC721ABI } from "./../../../contract/abis";
// Image
import UnRevealed from "./../../../public/assets/category-card/Unreveal_Card.png";

function PublicNFTSale() {
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();
  let NFTContract;
  if (typeof window !== "undefined") {
    NFTContract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
  }

  const handleBuyUncommon = () => {
    console.log("Uncommon");
    NFTContract.name().then((responce) => {
      console.log("Responce:", responce);
    });
  };
  const handleBuyRare = () => {
    console.log("Rare");
  };
  console.log("Siger:", signer, "Address:", address);
  useEffect(() => {
    console.log("Contract:", NFTContract);

    // NFTContract.name()
    //   .then((responce) => {
    //     console.log("Responce:", responce);
    //   })
    //   .catch((err) => console.log("Error:", err));
  }, [signer]);
  return (
    <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 mb-28 rounded-3xl">
      <div className="flex justify-center mb-2">
        <div className="bg-primary border-2 border-[#FF0000] font-a4speed text-3xl pt-4 pb-3 px-12 rounded-full -mt-8 mb-8">
          Uncommon <span className="font-sans">/</span> Rare
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col items-center pb-12 px-12">
        {/* Uncommon Card ----------------> */}
        <div className="w-auto lg:w-1/4 bg-secondary p-3 mx-auto rounded-xl">
          <div>
            <div className="flex justify-center items-center font-astrolab text-white text-xl bg-[url('/assets/category-card/Card_Title_BG.svg')] bg-no-repeat bg-center bg-cover h-16 rounded-t-xl">
              Uncommon
            </div>
            <Image
              src={UnRevealed}
              alt="NFT Image"
              className="rounded-b-xl"
              width="350"
              height="235"
            />
          </div>
          {/* Image */}
          <div className="w-full my-2">
            <div className="main-progress-bar stripes animated">
              <span className="uncommon-progress-bar"></span>
            </div>
            <style jsx>{`
              @keyframes uncommon-progress {
                0% {
                  width: 0%;
                }
                100% {
                  width: ${25 + "%"};
                }
              }
              .main-progress-bar {
                background-color: #1a1a1a;
                height: 1rem;
                width: auto;
                border-radius: 5px;
                box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
              }
              .stripes {
                background-size: 30px 30px;
                background-image: linear-gradient(
                  135deg,
                  rgba(255, 255, 255, 0.15) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(255, 255, 255, 0.15) 50%,
                  rgba(255, 255, 255, 0.15) 75%,
                  transparent 75%,
                  transparent
                );
              }
              .stripes.animated {
                animation: animate-stripes 1s linear infinite;
              }
              .uncommon-progress-bar {
                display: block;
                height: 1rem;
                width: 0%;
                background-color: #34c2e3;
                border-radius: 6px;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset;
                position: relative;
                animation: uncommon-progress 2s forwards;
              }
            `}</style>
            <div className="flex justify-between items-center text-sm py-2 px-1.5">
              <span>25%</span>
              <span>Total Sold</span>
            </div>
          </div>
          {/* Buy Now */}
          <button
            type="button"
            onClick={() => handleBuyUncommon()}
            className="w-full text-md text-center text-slate-400 hover:text-white font-semibold bg-primary active:bg-secondary border border-pink-300 border-b-4 border-l-4 hover:border-slate-600 hover:border-b-4 py-3 rounded-xl"
          >
            Buy Now
          </button>
        </div>
        {/* Uncommon Card <---------------- */}
        <div className="w-full lg:w-2/4 text-center text-4xl font-play font-semibold grid-flow-col py-12">
          <h3>
            Chase2Earn <span className=" font-sans">|</span> Public NFT Sale
          </h3>
          <div className="font-play">
            <p className="text-lg mt-4">Sale will Start In</p>
            <div className="flex justify-center my-2">
              {/* Days */}
              <div className="">
                <div className="">
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2 mr-1">
                    5
                  </span>
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2">
                    5
                  </span>
                </div>
                <p className="text-sm mt-1">DAYS</p>
              </div>
              {/* Hours */}
              <div className="px-4">
                <div className="">
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2 mr-1">
                    2
                  </span>
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2">
                    2
                  </span>
                </div>
                <p className="text-sm mt-1">HOURS</p>
              </div>
              {/* Minutes */}
              <div className="">
                <div className="">
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2 mr-1">
                    5
                  </span>
                  <span className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2">
                    7
                  </span>
                </div>
                <p className="text-sm mt-1">MINUTES</p>
              </div>
            </div>
            <div className="flex mt-12">
              <div className="w-1/2 text-right text-xl border-r-2 border-indigo-600 py-2 pr-2">
                <p>Uncommon NFT Total Supply</p>
                <p>4500</p>
              </div>
              <div className="w-1/2 text-left text-xl py-2 pl-2">
                <p>Rare NFT Total Supply</p>
                <p>4500</p>
              </div>
            </div>
            {/* <div>{days ? days : "00"}</div>
              <div>{hours ? hours : "00"}</div>
              <div>{minutes ? minutes : "00"}</div>
              <div>{seconds ? seconds : "00"}</div> */}
          </div>
        </div>
        {/* Rare Card ----------------> */}
        <div className="w-auto lg:w-1/4 bg-secondary p-3 mx-auto rounded-xl">
          <div>
            <div className="flex justify-center items-center font-astrolab text-white text-xl bg-[url('/assets/category-card/Card_Title_BG.svg')] bg-no-repeat bg-center bg-cover h-16 rounded-t-xl">
              Rare
            </div>
            <Image
              src={UnRevealed}
              alt="NFT Image"
              className="rounded-b-xl"
              width="350"
              height="235"
            />
          </div>

          <div className="w-full my-2">
            <div className="main-progress-bar stripes animated">
              <span className="rare-progress-bar"></span>
            </div>
            <style jsx>{`
              @keyframes rare-progress {
                0% {
                  width: 0%;
                }
                100% {
                  width: ${35 + "%"};
                }
              }
              .main-progress-bar {
                background-color: #1a1a1a;
                height: 1rem;
                width: auto;
                border-radius: 5px;
                box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
              }
              .stripes {
                background-size: 30px 30px;
                background-image: linear-gradient(
                  135deg,
                  rgba(255, 255, 255, 0.15) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(255, 255, 255, 0.15) 50%,
                  rgba(255, 255, 255, 0.15) 75%,
                  transparent 75%,
                  transparent
                );
              }
              .stripes.animated {
                animation: animate-stripes 1s linear infinite;
              }
              .rare-progress-bar {
                display: block;
                height: 1rem;
                width: 0%;
                background-color: #34c2e3;
                border-radius: 6px;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset;
                position: relative;
                animation: rare-progress 2s forwards;
              }
            `}</style>
            <div className="flex justify-between items-center text-sm py-2 px-1.5">
              <span>32%</span>
              <span>Total Sold</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleBuyRare()}
            className="w-full text-md text-center text-slate-400 hover:text-white font-semibold bg-primary  active:bg-secondary border border-pink-300 border-b-4 border-l-4 hover:border-slate-600 hover:border-b-4 py-3 rounded-xl"
          >
            Buy Now
          </button>
        </div>
        {/* Rare Card <---------------- */}
      </div>
    </div>
  );
}

export default PublicNFTSale;

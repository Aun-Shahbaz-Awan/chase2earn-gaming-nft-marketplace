import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { ERC721Address, MKPlaceAddress } from "./../../../contract/addresses";
import { ERC721ABI, MKPlaceABI } from "./../../../contract/abis";
// Image
import Title_BG from "./../../../public/assets/category-card/Title_BG.svg";
import UnRevealed from "./../../../public/assets/category-card/Unreveal_Card.png";
import RareGIF from "./../../../public/assets/category-card/_rare.gif";
// import UncommonGIF from "./../../../public/assets/category-card/_uncommon.gif";
// import Class_T from "./../../../public/assets/category-card/Class_T.png";
import Cyclone from "./../../../public/assets/category-card/Cyclone_GT.png";
import AMG from "./../../../public/assets/category-card/AMG_63.png";
import FANTOM from "./../../../public/assets/category-card/Fantom.png";
import C_TYPE from "./../../../public/assets/category-card/Jaguar_C_Type.png";
import F11 from "./../../../public/assets/category-card/Unreveal_Card.png";
// ---- headless-ui & react-tostify
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

function PublicNFTSale() {
  /* global BigInt */
  const { data: signer } = useSigner();
  // const { address } = useAccount();
  const [tokenAvailabilityStatus, setTokenAvailabilityStatus] = useState({});
  const [mintingStatus, setMintingStatus] = useState(false);
  const [mintingProcessStatus, setMintingProcessStatus] = useState(false);
  const [mintingId, setMintingId] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");

  let NFTContract = "",
    MKPContract = "";
  if (typeof window !== "undefined") {
    NFTContract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
    MKPContract = new ethers.Contract(MKPlaceAddress, MKPlaceABI, signer);
  }
  console.log("Minting ID#:", mintingId);

  const fetchTokenAvailabilityStatus = async () => {
    console.log("Fetching Avaible NFT...")
    const uncommon = (
      await Promise.all(
        [5, 6, 7, 8].map(async (number) => {
          const availibilityStatus = await NFTContract.carInfo(number).then(
            (responce) => {
              return parseInt(responce.amount, 10) >
                parseInt(responce.totalSelled, 10)
                ? number
                : false;
            }
          );
          return availibilityStatus;
        })
      )
    ).filter(Boolean);
    const rare = (
      await Promise.all(
        [1, 2, 3, 4].map(async (number) => {
          const availibilityStatus = await NFTContract.carInfo(number).then(
            (responce) => {
              return parseInt(responce.amount, 10) >
                parseInt(responce.totalSelled, 10)
                ? number
                : false;
            }
          );
          return availibilityStatus;
        })
      )
    ).filter(Boolean);
    setTokenAvailabilityStatus({ uncommon, rare });
  };

  const handleBuyUncommon = () => {
    setMintingStatus(true);
    const mintId =
      tokenAvailabilityStatus.uncommon[
        Math.floor(Math.random() * tokenAvailabilityStatus?.uncommon?.length)
      ];
    setMintingId(mintId);
    toast.promise(
      MKPContract.buyCar(mintId, 1, {
        value: BigInt(ethers.utils.parseEther("0.0000000000000001")),
      })
        .then((tx) => {
          toast.promise(
            tx.wait().then((responce) => {
              setMintingProcessStatus(true);
              setTransactionHash(responce?.transactionHash);
              console.log("Minted #", mintId, " :", responce);
            }),
            {
              pending: "Minting in Process...",
              success: "Minted Successfully!",
            }
          );
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setMintingStatus(false);
          console.log("Error", err);
        }),
      {
        pending: "Tranaction in Process...",
      }
    );
  };

  const handleBuyRare = () => {
    setMintingStatus(true);
    const mintId =
      tokenAvailabilityStatus.rare[
        Math.floor(Math.random() * tokenAvailabilityStatus?.rare?.length)
      ];
    setMintingId(mintId);
    toast.promise(
      MKPContract.buyCar(mintId, 1, {
        value: BigInt(ethers.utils.parseEther("0.0000000000000001")),
      })
        .then((tx) => {
          toast.promise(
            tx.wait().then((responce) => {
              setMintingProcessStatus(true);
              setTransactionHash(responce?.transactionHash);
              console.log("Minted #", mintId, " :", responce);
            }),
            {
              pending: "Minting in Process...",
              success: "Minted Successfully!",
            }
          );
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setMintingStatus(false);
          console.log("Error", err);
        }),
      {
        pending: "Tranaction in Process...",
      }
    );
  };
  console.log("Available NFT:", tokenAvailabilityStatus)
  useEffect(() => {
    if (NFTContract !== "" && signer) {
       fetchTokenAvailabilityStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  return (
    <>
      {/* react_toastify model */}
      <ToastContainer />
      {/* headless ui model */}
      <Transition appear show={mintingStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setMintingStatus(false);
            setMintingProcessStatus(false);
            setTransactionHash("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-500 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold font-astrolab leading-6 text-gray-900 text-center"
                  >
                    {!mintingProcessStatus ? "MINTING..." : "MINTED"}
                  </Dialog.Title>
                  <div className="mt-4">
                    {!mintingProcessStatus ? (
                      <Image
                        src={RareGIF}
                        alt="rare-gif"
                        className="rounded-xl"
                      />
                    ) : (
                      <>
                        {mintingId === 5 ? (
                          <Image src={AMG} alt="AMG" className="rounded-xl" />
                        ) : (
                          <>
                            {mintingId === 6 ? (
                              <Image
                                src={FANTOM}
                                alt="AMG"
                                className="rounded-xl"
                              />
                            ) : (
                              <>
                                {mintingId === 7 ? (
                                  <Image
                                    src={C_TYPE}
                                    alt="AMG"
                                    className="rounded-xl"
                                  />
                                ) : (
                                  <>
                                    {mintingId === 8 ? (
                                      <Image
                                        src={F11}
                                        alt="AMG"
                                        className="rounded-xl"
                                      />
                                    ) : (
                                      <>
                                        {mintingId === 1 ? (
                                          <Image
                                            src={CLASS_T}
                                            alt="AMG"
                                            className="rounded-xl"
                                          />
                                        ) : (
                                          <>
                                            {mintingId === 2 ? (
                                              <Image
                                                src={Cyclone}
                                                alt="AMG"
                                                className="rounded-xl"
                                              />
                                            ) : (
                                              <>
                                                {mintingId === 3 ? (
                                                  <Image
                                                    src={CLASS_T}
                                                    alt="AMG"
                                                    className="rounded-xl"
                                                  />
                                                ) : (
                                                  <>
                                                    {mintingId === 3 ? (
                                                      <Image
                                                        src={CLASS_T}
                                                        alt="AMG"
                                                        className="rounded-xl"
                                                      />
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {transactionHash ? (
                    <div className="mt-2">
                      <p className="text-lg font-medium text-blue-400 cursor-pointer inline-block px-2">
                        <a
                          href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
                          target="_blank"
                          className="flex items-center"
                          rel="noreferrer"
                        >
                          Tx Hash: {transactionHash.slice(0, 25)}...
                          <FiExternalLink className="ml-1" />
                        </a>
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}

                  {mintingProcessStatus ? (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setMintingStatus(false);
                          setMintingProcessStatus(false);
                          setTransactionHash("");
                        }}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* headless ui model */}
      <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 mb-28 mt-12 rounded-3xl">
        <div className="flex justify-center mb-2">
          <div className="bg-primary border-2 border-[#FF0000] font-a4speed text-3xl pt-4 pb-3 px-12 rounded-full -mt-8 mb-8">
            Uncommon <span className="font-sans">/</span> Rare
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col items-center pb-12 px-12">
          {/* Uncommon Card ----------------> */}
          <div className="w-auto lg:w-1/4 bg-secondary p-3 mx-auto rounded-xl">
            <div>
              <div
                className="flex justify-center items-center font-astrolab text-white text-xl bg-no-repeat bg-center bg-cover h-16 rounded-t-xl"
                style={{
                  backgroundImage: `url(${Title_BG})`,
                }}
              >
                Uncommon
              </div>
              <Image
                src={UnRevealed}
                alt="UnRevealed"
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
              {/* Slot Machine */}
              {/* {"UnCommon".toUpperCase().split("").map((char, index) => {
              return (
                <span
                  key={"uncommon" + index}
                  className="bg-gradient-to-br from-secondary to-slate-800 rounded-md py-1 px-2 mr-1"
                >
                  {char}
                </span>
              );
            })} */}
              {/* Time --------------------------------> */}
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
              {/* Time <-------------------------------- */}
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
              <div
                className="flex justify-center items-center font-astrolab text-white text-xl bg-no-repeat bg-center bg-cover h-16 rounded-t-xl"
                style={{
                  backgroundImage: `url(${Title_BG})`,
                }}
              >
                Rare
              </div>
              <Image
                src={UnRevealed}
                alt="Unrevealed"
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
    </>
  );
}

export default PublicNFTSale;

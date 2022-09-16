import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { ERC721Address, MKPlaceAddress } from "../../contract/addresses";
import { ERC721ABI, MKPlaceABI } from "../../contract/abis";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/state";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SellPriceModal from "../../components/utils/SellPopup";

export default function Asset() {
  /* global BigInt */
  const router = useRouter();
  const { slug } = router.query;
  // wegmi ---------------------------------------
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const tokenContext = useAppContext();
  // wegmi ---------------------------------------
  const [tokenInfo, setTokenInfo] = React.useState({});
  const [listingInfo, setListingInfo] = React.useState({});
  const [owner, setOwner] = React.useState({
    status: false,
    address: "",
    loaded: false,
  });
  const [listedStatus, setListedStatus] = React.useState(false);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [sellPriceModel, setSellPriceModel] = React.useState({
    openStatus: false,
    price: 0,
  });

  let contract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
  let mk_contract = new ethers.Contract(MKPlaceAddress, MKPlaceABI, signer);
  // Get Token Info ---------------------------------------------------------
  const getTokenInfo = () => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/nft/${slug[0]}/${slug[1]}?chain=rinkeby&format=decimal`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.moralisKey,
          },
        }
      )
      .then((responce) => {
        setTokenInfo(responce?.data);
        console.log("Token Info:", responce?.data?.metadata);
      })
      .catch((error) => console.log(error));
  };
  // Get Token Info ---------------------------------------------------------
  const getListingInfo = () => {
    axios
      .get(process.env.baseURL + "/list/get-listing/" + slug[1])
      .then((responce) => {
        setListingInfo(responce?.data);
        console.log("Listing Info:", responce?.data);
      })
      .catch((error) => console.log(error));
  };
  // Get Owner --------------------------------------------------------------
  const getOwner = () => {
    contract
      .ownerOf(slug[1])
      .then((responce) => {
        if (address === responce) {
          setOwner({ status: true, address: responce, loaded: true });
        } else setOwner({ status: false, address: responce, loaded: true });
      })
      .catch((error) => {
        console.log(error);
        setOwner({ status: false, address: "", loaded: true });
      });
  };
  // Get Listed Status -------------------------------------------------------
  const getListed = () => {
    mk_contract
      .checkIsAlreadtisted(slug[1])
      .then((responce) => {
        setListedStatus(responce);
      })
      .catch((error) => console.log(error));
  };
  // Sell Token (i.e List Item)--------------------------------------------------------------
  const handleSellToken = () => {
    axios
      .get(process.env.baseURL + "/attribute/get/" + slug[1])
      .then((response) => {
        if (response?.data?.damage >= 100) {
          mk_contract
            .listCar(
              tokenInfo?.token_id,
              ethers.utils.parseUnits(
                sellPriceModel?.price?.toString(),
                "ether"
              )
            )
            .then((responce) => {
              toast.promise(
                responce.wait().then((tx) => {
                  console.log("Marketplace List Token :", tx);
                  axios
                    .post(
                      process.env.baseURL + "/list/create",
                      {
                        owner_address: address,
                        token_address: tokenInfo.token_address,
                        token_id: tokenInfo.token_id,
                        isListed: true,
                        price: sellPriceModel?.price,
                        slug: JSON.parse(tokenInfo?.metadata)
                          .name.replace(/\s+/g, "-")
                          .toLowerCase(),
                        metadata: JSON.parse(tokenInfo?.metadata),
                      },
                      {
                        headers: {
                          Authorization: "Bearer " + tokenContext?.bearerToken,
                        },
                      }
                    )
                    .then((responce) => {
                      console.log("Add Listing to DB:", responce);
                      getOwner();
                      getListed();
                    })
                    .catch((error) => {
                      console.log("Add Listing to DB:", error);
                      getOwner();
                      getListed();
                    });
                }),
                {
                  pending: "Listing in Process...",
                  success: "Listed Successfully!",
                }
              );
            })
            .catch((error) => {
              console.log("Marketplace List Token Error:", error);
              toast.error("Something wrong with Listing.");
            });
        } else {
          toast.error("Damage recovery must be 100%!");
        }
      });
  };
  // Buy Token ----------------------------------------------------------
  const handleBuyToken = () => {
    mk_contract
      .sell(owner?.address, slug[1], {
        // value: BigInt(ethers.utils.parseEther(listingInfo?.price)),
        value: ethers.utils.parseEther(listingInfo?.price.toString()),
      })
      .then((responce) => {
        toast.promise(
          responce
            .wait()
            .then((tx) => {
              axios
                .put(
                  process.env.baseURL +
                    "/list/update-listing-status/" +
                    slug[1],
                  {
                    isListed: false,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + tokenContext?.bearerToken,
                    },
                  }
                )
                .then((responce) => {
                  console.log("Add Listing to DB:", responce);
                })
                .catch((error) => {
                  console.log("Add Listing to DB:", error);
                });
              getOwner();
              getListed();
              toast.success("Purchased Sucessfully");
            })
            .catch((err) => {
              console.log("Error in Purchase", err);
              toast.error;
            }),
          {
            pending: "Purchase in Process...",
          }
        );
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (slug && signer) {
      getTokenInfo();
      localStorage.setItem("slug", slug);
      if (isConnected) {
        getOwner();
        getListed();
        getListingInfo();
        setLoadingStatus(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, slug]);
  console.log("Assets Randering...:", tokenInfo);
  if (sellPriceModel?.price > 0) {
    console.log(
      sellPriceModel?.price,
      "ETH in Wei:",
      ethers.utils.parseUnits(sellPriceModel?.price?.toString(), "ether")
    );
  }

  if (owner.loaded === true && owner?.address === "")
    return (
      <>
        <Navbar />
        <h3 className="text-3xl font-semibold text-center mt-12">
          Token ID Not Exist
        </h3>
      </>
    );
  return (
    <>
      {/* react_toastify model */}
      <SellPriceModal
        handleSellToken={handleSellToken}
        sellPriceModel={sellPriceModel}
        setSellPriceModel={setSellPriceModel}
        token={tokenInfo}
      />
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col lg:flex-row px-8 md:px-40 py-3 md:py-8 lg:py-12">
        <div className="w-full h-full lg:w-6/12 xl:w-5/12 pr-0 lg:pr-8 xl:pr-24">
          {loadingStatus ? (
            <div className="w-full h-[78vh] lg:h-[83vh] xl:h-[73vh] 2xl:h-[80vh]">
              <iframe
                src="/animation-url"
                width="100%"
                className="w-full h-full"
                title="Animated NFT Card"
                sandbox="allow-scripts allow-popups allow-same-origin"
              ></iframe>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full lg:w-6/12 xl:w-7/12 ">
          {/* <h2 className="text-3xl font-semibold">{tokenInfo?.name}</h2> */}
          <h2 className="text-3xl font-semibold">
            {tokenInfo.metadata
              ? JSON.parse(tokenInfo?.metadata)?.name + " #" + slug[1]
              : "Loading..."}
          </h2>
          <p className="mt-1">
            Owned by{" "}
            <span className="text-blue-400">
              {owner?.status
                ? "You"
                : owner?.address?.slice(0, 6) +
                  "...." +
                  owner?.address?.slice(-5)}
            </span>
          </p>
          {/* Price BOx */}
          <div className="border border-secondary mt-8 rounded-xl">
            <div className="bg-secondary rounded-t-xl">
              <h2 className="text-xl font-semibold py-3 pl-3">Price</h2>
            </div>
            <div className="">
              {owner?.status ? (
                listedStatus ? (
                  <div className="flex justify-between items-center px-6 py-6">
                    <div>
                      <p className="text-lg font-normal text-gray-300">
                        Current Price:
                      </p>
                      <p className="text-base">
                        <span className="text-3xl font-semibold text-blue-400">
                          {listingInfo?.price
                            ? listingInfo?.price
                            : "Loading..."}
                        </span>
                        <span className="text-lg font-semibold text-gray-300">
                          {" "}
                          Ether{"  "}
                        </span>
                        {/* (
                        {ethers.utils.formatEther(
                          listingInfo?.price ? listingInfo?.price : "exxor"
                        )}{" "}
                        Eth) */}
                      </p>
                    </div>

                    <button
                      type="button"
                      //   onClick={() => handleSellToken()}
                      className="text-lg font-semibold text-black bg-wallet py-2 px-16 rounded-full"
                    >
                      Listed By You
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end px-4 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSellPriceModel((sellPriceModel) => ({
                          ...sellPriceModel,
                          openStatus: true,
                        }));
                      }}
                      className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
                    >
                      Sell
                    </button>
                  </div>
                )
              ) : listedStatus ? (
                <div className="flex justify-between items-center px-6 py-6">
                  <div>
                    <p className="text-lg font-normal text-gray-300">
                      Current Price:
                    </p>
                    <p className="text-base">
                      <span className="text-3xl font-semibold text-blue-400">
                        {listingInfo.price}
                      </span>
                      <span className="text-lg font-semibold text-gray-300">
                        {" "}
                        Ether{"  "}
                      </span>
                      {/* ({ethers.utils.formatEther(listingInfo.price)} Eth) */}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBuyToken()}
                    className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
                  >
                    Buy
                  </button>
                </div>
              ) : (
                <div className="flex justify-end px-4 py-4">
                  <button
                    type="button"
                    // onClick={() => handleBuyToken()}
                    className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
                  >
                    Not Listed Yet
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border border-secondary mt-8 rounded-xl">
            <div className="bg-secondary rounded-t-xl">
              <h2 className="text-xl font-semibold py-3 pl-3">Details</h2>
            </div>
            <div className="py-3">
              {/* Address */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-base text-gray_ py-3 px-6">
                  Contract Address
                </h2>
                <h2 className="text-lg font-base text-blue-400 tracking-wider py-3 px-6">
                  {tokenInfo?.token_address?.slice(0, 6) +
                    "..." +
                    tokenInfo?.token_address?.slice(-5)}
                </h2>
              </div>
              {/* Id */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-base text-gray_ py-3 px-6">
                  Token ID
                </h2>
                <h2 className="text-lg font-base text-gray_ tracking-wider py-3 px-6">
                  {" "}
                  {tokenInfo?.token_id}
                </h2>
              </div>
              {/* Standard */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-base text-gray_ py-3 px-6">
                  Token Standard
                </h2>
                <h2 className="text-lg font-base text-gray_ tracking-wider py-3 px-6">
                  {" "}
                  ERC-721
                </h2>
              </div>
              {/* Blockchain */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-base text-gray_ py-3 px-6">
                  Blockchain
                </h2>
                <h2 className="text-lg font-base text-gray_ tracking-wider py-3 px-6">
                  Rinkeby
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

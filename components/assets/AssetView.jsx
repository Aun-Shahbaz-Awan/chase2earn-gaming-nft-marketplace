import React from "react";
// --------------------------------------- wegmi
import { useAccount, useSigner } from "wagmi";
// --------------------------------------- components
import Navbar from "../Navbar";
// --------------------------------------- contract
// import { ethers } from "ethers";
import { ERC721Address, MKPlaceAddress } from "../../contract/addresses";
import { ERC721ABI, MKPlaceABI } from "../../contract/abis";
import { ethers } from "ethers";

export default function AssetView({ tokenInfo, slug }) {
  const [owner, setOwner] = React.useState({ status: false, address: "" });
  const [listed, setListed] = React.useState(false);
  // wegmi ---------------------------------------
  const { address, isConnected } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  console.log("Is Connected:", isConnected, " - Address:", address);
  // wegmi ---------------------------------------
  let contract = new ethers.Contract(ERC721Address, ERC721ABI, signer);
  let mk_contract = new ethers.Contract(MKPlaceAddress, MKPlaceABI, signer);
  // Get Owner ---------------------------------------------------------
  const getOwner = () => {
    contract.ownerOf(slug[1]).then((responce) => {
      //   if (tokenInfo?.owner_of === responce) setOwner(true);
      if (address === responce) {
        setOwner({ status: true, address: responce });
      } else setOwner({ status: false, address: responce });
    });
  };
  const getListed = () => {
    mk_contract.checkIsAlreadtisted(slug[1]).then((responce) => {
      setListed(responce);
      getOwner();
      getListed();
    });
  };
  // Sell Token ---------------------------------------------------------
  const handleSellToken = () => {
    mk_contract
      .list(tokenInfo?.token_id, 100)
      .then((responce) => {
        console.log("Listed Bro!:", responce);
        getOwner();
        getListed();
      })
      .catch((err) => console.log(err));
  };
  // Buy Token ----------------------------------------------------------
  /* global BigInt */
  const handleBuyToken = () => {
    mk_contract
      .sell(owner?.address, slug[1], {
        value: BigInt(ethers.utils.parseEther("0.0000000000000001")),
      })
      .then((responce) => {
        console.log("Listed Bro!:", responce);
        getOwner();
        getListed();
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && signer) {
      getOwner();
      getListed();
    }
  }, [signer]);
  console.log("MK Place", listed);
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row px-8 md:px-40 py-3 md:py-8 lg:py-12">
        <div className="w-full h-full lg:w-6/12 xl:w-5/12 pr-0 lg:pr-8 xl:pr-24">
          <iframe
            src="/animation-url"
            width="100%"
            // height="100%"
            className="w-full h-[78vh] lg:h-[83vh] xl:h-[73vh] 2xl:h-[80vh]"
            title="Animated NFT Card"
          ></iframe>
        </div>
        <div className="w-full lg:w-6/12 xl:w-7/12 ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{tokenInfo?.name}</h2>
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
            </div>
            {owner?.status ? (
              listed ? (
                <button
                  type="button"
                  //   onClick={() => handleSellToken()}
                  className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
                >
                  Listed
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSellToken()}
                  className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
                >
                  Sell
                </button>
              )
            ) : listed ? (
              <button
                type="button"
                onClick={() => handleBuyToken()}
                className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
              >
                Buy
              </button>
            ) : (
              <button
                type="button"
                // onClick={() => handleBuyToken()}
                className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
              >
                Not Listed Yet
              </button>
            )}
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

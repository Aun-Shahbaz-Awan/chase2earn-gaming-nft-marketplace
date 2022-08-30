import React from "react";
import { useRouter } from "next/router";
// import AnimatedNFT from "../../components/AnimatedNFT";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Asset() {
  const router = useRouter();
  const { slug } = router.query;

  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [tokenInfo, setTokenInfo] = React.useState({});

  const getTokenInfo = () => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/nft/${
          localStorage.getItem("slug").split(",")[0]
        }/${
          localStorage.getItem("slug").split(",")[1]
        }?chain=rinkeby&format=decimal`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key":
              "lEgC4FuVemuR3VBs9GTduYZjNWf5TNB5yWVPOc8mE76MZmFISj0mizqNmmZcKJUV",
          },
        }
      )
      .then((responce) => {
        setTokenInfo(responce?.data);
      });
  };
  // ----------------------------------------------- For Client Side Rendering ----->
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("slug", slug);
      getTokenInfo();
      setLoadingStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row px-8 md:px-40 py-3 md:py-8 lg:py-12">
        <div className="w-full h-full lg:w-6/12 xl:w-5/12 pr-0 lg:pr-8 xl:pr-24">
          <iframe
            src="/animated-nft"
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
                Owner by{" "}
                <span className="text-blue-400">
                  {tokenInfo?.owner_of?.slice(0, 6) +
                    "...." +
                    tokenInfo?.owner_of?.slice(-5)}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="text-lg font-semibold text-black bg-wallet py-2 px-20 rounded-full"
            >
              Sell
            </button>
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
                  {" "}
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

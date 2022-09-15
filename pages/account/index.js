import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { ERC721Address } from "../../contract/addresses";
// import Navbar from "./_main/Navbar";
import CollectionTypeCard from "../../components/account/NFTCard";
import LazyCollectionTypeCard from "../../components/account/LazyCard";
import Navbar from "../../components/Navbar";
import { RiUser4Line } from "react-icons/ri";

function Account() {
  const { address } = useAccount();
  const [NFTS, setNFTS] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [cursor, setCursor] = useState(null);

  const getUsersNFTS = () => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/${address}/nft/${ERC721Address}?chain=rinkeby&format=decimal&limit=12`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.moralisKey,
          },
        }
      )
      .then((responce) => {
        setNFTS(responce?.data?.result);
        setCursor(responce?.data?.cursor);
        setLoadingStatus(true);
      });
  };
  const handleLoadMore = () => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/${address}/nft/${ERC721Address}?chain=rinkeby&format=decimal&limit=12&cursor=` +
          cursor,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.moralisKey,
          },
        }
      )
      .then((responce) => {
        let newArray = NFTS.concat(responce?.data?.result);
        setCursor(responce?.data?.cursor);
        setNFTS(newArray);
        setLoadingStatus(true);
      });
  };
  console.log("Tokens:", NFTS, "ADDRESSE:", address);
  //   console.log("ERC Adress:", ERC721Address, "Cursor:", cursor);
  useEffect(() => {
    if (address) getUsersNFTS();
  }, [address]);
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <Navbar />
      {/* <h3 className="text-4xl font-bold text-center px-12 mt-12">
        MY Collection
      </h3> */}
      <div className="px-20 mb-24">
        <div className="relative bg-secondary h-44 rounded-xl">
          <div className="absolute flex items-center justify-center bg-gray-400 h-36 w-36 rounded-full left-16 -bottom-16 border-8 border-primary">
            <RiUser4Line className="text-primary text-7xl font-bold" />
          </div>
          <h4 className="absolute left-56 bottom-4 text-gray-400 text-2xl font-semibold">
            {/* {address?.slice(0, 8)+"..."+address?.slice(-4)} */}
          </h4>
        </div>
      </div>
      <div className="mt-16 mx-8 md:mx-12 lg:mx-16 mb-12 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 mx-4">
          {NFTS.length || loadingStatus ? (
            <>
              {NFTS.length ? (
                NFTS.map((token) => {
                  return (
                    <CollectionTypeCard key={token?.token_id} token={token} />
                  );
                })
              ) : (
                <h3>No Item Found!</h3>
              )}
            </>
          ) : (
            [...Array(4)].map((card, index) => {
              return <LazyCollectionTypeCard key={"lazy" + index} />;
            })
          )}
        </div>

        {cursor !== null ? (
          <div className="w-full flex justify-center my-12">
            <button
              onClick={() => handleLoadMore()}
              className="text-md font-medium bg-secondary py-3 px-10 rounded-full mx-auto"
            >
              See More{" "}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
}

export default Account;

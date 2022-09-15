import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ERC721Address } from "../../contract/addresses";
import NFTCard from "../../components/sub/NFTCard";
import NFTCardLazy from "../../components/sub/NFTCardLazy";
import Navbar from "../../components/Navbar";

export default function Collection() {
  const router = useRouter();
  const { type } = router.query;
  const [listedNFTs, setListedNFTs] = React.useState([]);
  const [cursor, setCursor] = React.useState(null);

  const getListedNFTs = () => {
    axios
      .get(process.env.baseURL + `/list/${type}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((responce) => {
        setListedNFTs(responce?.data);
        console.log("Listed NFT Responce:", responce?.data);
      });
  };
  // const getListedNFTs = () => {
  //   axios
  //     .get(
  //       `https://deep-index.moralis.io/api/v2/nft/${ERC721Address}?chain=rinkeby&format=decimal&limit=100`,
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "X-API-Key": process.env.moralisKey,
  //         },
  //       }
  //     )
  //     .then((responce) => {
  //       setListedNFTs(responce?.data?.result);
  //       setCursor(responce?.data?.cursor);
  //     });
  // };
  // const handleLoadMore = () => {
  //   axios
  //     .get(
  //       `https://deep-index.moralis.io/api/v2/nft/${ERC721Address}?chain=rinkeby&format=decimal&limit=12&cursor=` +
  //         cursor,
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "X-API-Key": process.env.moralisKey,
  //         },
  //       }
  //     )
  //     .then((responce) => {
  //       let newArray = listedNFTs.concat(responce?.data?.result);
  //       setCursor(responce?.data?.cursor);
  //       setListedNFTs(newArray);
  //     });
  // };
  console.log("Listed NFTs:", listedNFTs);
  React.useEffect(() => {
    if (type) getListedNFTs();
  }, [type]);
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-8 md:mx-12 lg:mx-16 mb-12 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 mx-4">
          {listedNFTs?.length
            ? listedNFTs.map((token) => {
                return <NFTCard key={token?.token_id} token={token} />;
              })
            : [...Array(4)].map((card, index) => {
                return <NFTCardLazy key={"lazy" + index} />;
              })}
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
    </div>
  );
}

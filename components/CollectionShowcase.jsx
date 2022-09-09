import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NFTCard from "./sub/NFTCard";
import NFTCardLazy from "./sub/NFTCardLazy";
import { ERC721Address } from "./../contract/addresses";

function CollectionShowcase() {
  const [NFTS, setNFTS] = React.useState([]);
  const [cursor, setCursor] = React.useState(null);

  const router = useRouter();
  const { type } = router.query;
  console.log("Router:", router, "Slug:", type);

  const getNFTS = () => {
    axios
      .get(`http://localhost:8000/api/v1/list/${type}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((responce) => {
        // console.log("Responce:", responce?.data);
        setNFTS(responce?.data?.result);
        console.log("Responce:", responce?.data)
      });
  };
  // const getNFTS = () => {
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
  //       // console.log("Responce:", responce?.data);
  //       setNFTS(responce?.data?.result);
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
  //           "X-API-Key":
  //             "lEgC4FuVemuR3VBs9GTduYZjNWf5TNB5yWVPOc8mE76MZmFISj0mizqNmmZcKJUV",
  //         },
  //       }
  //     )
  //     .then((responce) => {
  //       let newArray = NFTS.concat(responce?.data?.result);
  //       setCursor(responce?.data?.cursor);
  //       setNFTS(newArray);
  //     });
  // };
  console.log("Tokens:", NFTS);
  //   console.log("ERC Adress:", ERC721Address, "Cursor:", cursor);
  React.useEffect(() => {
    if (typeof window !== "undefined") getNFTS();
  }, [type]);
  return (
    <>
      <div className="mt-16 mx-8 md:mx-12 lg:mx-16 mb-12 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 mx-4">
          {NFTS?.length
            ? NFTS.map((token) => {
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
    </>
  );
}

export default CollectionShowcase;

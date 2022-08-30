import axios from "axios";
import React from "react";
import NFTCard from "./sub/NFTCard";
// import Image from "next/image";
// import NFT from "../assets/NFT_Image.svg";
const tokens = [
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
  {
    id: "3112",
    name: "Token 1",
    price: "0.00",
  },
];

function NFTShowcase() {
  const [usersNFT, setUsersNFT] = React.useState([])
  const getUsersNFT = () => {
    axios
      .get(
        "https://deep-index.moralis.io/api/v2/0x919F1aF9BC7bB98D7052CB8B080578d8f4a1210d/nft/0xd1664A281B08d7b4249Cf09720C3f380604bBcEF?chain=rinkeby&format=decimal",
        {
          headers: {
            accept: "application/json",
            "X-API-Key":
              "lEgC4FuVemuR3VBs9GTduYZjNWf5TNB5yWVPOc8mE76MZmFISj0mizqNmmZcKJUV",
          },
        }
      )
      .then((responce) => {
        console.log("Responce:", responce?.data?.result);
        setUsersNFT(responce?.data?.result);
      });
  };
  React.useEffect(() => {
    getUsersNFT();
  }, []);
  return (
    <>
      <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 rounded-3xl">
        <div className="flex justify-center mb-16">
          <div className="bg-primary border-2 border-[#FF0000] py-4 px-20 rounded-full -mt-8 mb-8">
            Sale Start In : 54 Days
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mx-4">
          {usersNFT.map((token) => {
            return <NFTCard key={token?.token_id} token={token} />;
          })}
        </div>
        <div className="w-full flex justify-center my-12">
          <button className="text-md font-medium bg-secondary py-3 px-10 rounded-full mx-auto">
            See More{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default NFTShowcase;

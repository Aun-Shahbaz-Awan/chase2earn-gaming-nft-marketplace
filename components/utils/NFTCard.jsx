import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

function NFTCard({ token }) {
  const router = useRouter();
  const handleViewItem = () => {
    localStorage.setItem("token_metadata", token?.metadata);
    router.push(`/assets/${token?.token_address}/${token?.token_id}`);
  };

  return (
    <div className="bg-secondary p-3 mx-auto rounded-xl">
      <Image
        src={token?.metadata?.image}
        alt="NFT"
        className="rounded-xl"
        width="350"
        height="350"
      />
      <div className="flex justify-between text-xs py-4 px-6 my-2 bg-primary rounded-xl">
        <div className="">
          <p className="text-gray_">{token?.metadata?.name}</p>
          <p>#{token?.token_id}</p>
        </div>
        <div className="">
          <p className="text-gray_">Price</p>
          <p>{token.price} wei </p>
        </div>
      </div>
      {/* Buy Button */}
      {/* <Link href={`/assets/${token?.token_address}/${token?.token_id}`}> */}
      <button
        onClick={() => handleViewItem()}
        className="text-md font-medium bg-primary hover:bg-sky-800 py-3 px-8 rounded-xl w-full mx-auto"
      >
        View
      </button>
      {/* </Link> */}
    </div>
  );
}

export default NFTCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";

function NFTCard({ token }) {
  return (
    <div className="bg-secondary p-3 mx-auto rounded-xl">
      <Image
        src={token?.token_uri}
        alt="NFT Image"
        className="rounded-xl"
        width="350"
        height="350"
      />
      {/* <div className="bg-red-500 h-6 w-20 float-left">4</div>
            </div> */}
      {/* Name */}
      <h3 className="text-sm text-gray_">Collection:{" " + token?.name}</h3>
      <h3 className="text-sm">TOKEN_ID# {" " + token?.token_id}</h3>
      {/* Price */}
      <div className="flex justify-between text-xs py-4 px-6 my-4 bg-primary rounded-xl">
        <div className="">
          <p className="text-gray_">Price</p>
          <p>Not For Sale</p>
        </div>
        <div className="">
          <p className="text-gray_">Highest Bid</p>
          <p>14 ETH</p>
        </div>
      </div>
      {/* Buy Button */}
      <Link href={`/assets/${token?.token_address}/${token?.token_id}`}>
        <button className="text-md font-medium bg-primary py-2 px-8 rounded-xl w-full mx-auto">
          Buy Now
        </button>
      </Link>
    </div>
  );
}

export default NFTCard;

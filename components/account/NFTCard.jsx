import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

function NFTCard({ token }) {
  const router = useRouter();
  const handleViewItem = () => {
    localStorage.setItem("token_metadata", token?.metadata);
    // localStorage.setItem("slug", token?.metadata);
    router.push(`/assets/${token?.token_address}/${token?.token_id}`);
  };

  return (
    <div className="bg-secondary p-3 mx-auto rounded-xl">
      <Image
        src={JSON.parse(token?.metadata)?.image}
        alt="NFT"
        className="rounded-xl"
        width="350"
        height="350"
      />
      {/* <div className="bg-red-500 h-6 w-20 float-left">4</div>
            </div> */}
      {/* Name */}
      <div className="ml-2">      <h3 className="text-sm text-gray_ mt-4">
        Name:{" " + JSON.parse(token?.metadata)?.name}
      </h3>
      <h3 className="text-sm">ID# {" " + token?.token_id}</h3></div>

      {/* Price */}
      {/* <div className="flex justify-between text-xs py-4 px-6 my-4 bg-primary rounded-xl">
        <div className="">
          <p className="text-gray_">Price</p>
          <p>Not For Sale</p>
        </div>
        <div className="">
          <p className="text-gray_">Highest Bid</p>
          <p>14 ETH</p>
        </div>
      </div> */}
      {/* Buy Button */}
      {/* <Link href={`/assets/${token?.token_address}/${token?.token_id}`}> */}
      <button
        onClick={() => handleViewItem()}
        className="text-md font-medium bg-primary py-2 px-8 rounded-xl w-full mx-auto mt-4"
      >
        View
      </button>
      {/* </Link> */}
    </div>
  );
}

export default NFTCard;

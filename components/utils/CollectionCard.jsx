import React from "react";
import Image from "next/image";
import Link from "next/link";

function CollectionCard({ category }) {
  
  if (["Fantom", "AMG 63"].includes(category.name))
    return (
      <Link href={"listed/" + category?.url}>
        <div className="bg-secondary p-3 mx-auto rounded-xl cursor-pointer hover:scale-105 hover:border border-sky-900 ease-in-out transition-all">
          <Image
            src={category?.image}
            alt="NFT Image"
            className="rounded-xl"
            width="350"
            height="350"
          />
          <div className="flex justify-between text-xs py-4 px-6 mb-1 mt-2  bg-primary rounded-xl">
            <div className="">
              <p className="text-gray_">Name</p>
              <p className="text-gray_">Total Tokens</p>
            </div>
            <div className="">
              <p>{category?.name}</p>
              <p>{category?.totalTokens}</p>
            </div>
          </div>
        </div>
      </Link>
    );
}

export default CollectionCard;

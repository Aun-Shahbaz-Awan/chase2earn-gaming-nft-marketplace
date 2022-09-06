// import axios from "axios";
import React from "react";
import CollectionTypeCard from "../../sub/CollectionTypeCard";
import Cyclone_GT from "./../../../public/assets/category-card/Cyclone_GT.png";
import Class_T from "./../../../public/assets/category-card/Class_T.png";
import AMG_63 from "./../../../public/assets/category-card/AMG_63.png";
// import F11 from "./../../../public/assets/category-card/F11.png";
import Fantom from "./../../../public/assets/category-card/Fantom.png";
import Jaguar_C_Type from "./../../../public/assets/category-card/Jaguar_C_Type.png";
// import { useCountdown } from "./../hooks/useCountdown";
// --------------------------------------- wegmi
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import PublicNFTSale from "./PublicNFTSale";
// --------------------------------------- component
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const rare = [
  {
    id: "Rare_1",
    name: "AMG 63",
    url: "amg-gt",
    image: AMG_63,
    totalTokens: 450,
  },
  // {
  //   id: "Rare_2",
  //   name: "F11",
  //   url: "f11",
  //   image: F11,
  //   totalTokens: 1500,
  // },
  {
    id: "Rare_3",
    name: "Fantom",
    url: "fantom",
    image: Fantom,
    totalTokens: 500,
  },
  {
    id: "Rare_4",
    name: "Jaguar C-Type",
    url: "jaguar-c-type",
    image: Jaguar_C_Type,
    totalTokens: 250,
  },
];
const uncommon = [
  {
    id: "Uncommon_1",
    name: "Cyclone GT",
    url: "cyclone-gt",
    image: Cyclone_GT,
    totalTokens: 1200,
  },
  {
    id: "Uncommon_2",
    name: "Class T",
    url: "class-t",
    image: Class_T,
    totalTokens: 1500,
  },
];
function CollectionTypeSection() {
  // let [days, hours, minutes, seconds] = useCountdown("2022-11-19T12:59-0500");
  return (
    <>
      {/* Uncommon / Rare NFT */}
      {/* <WagmiConfig client={client}> */}
        <PublicNFTSale />
      {/* </WagmiConfig> */}
      {/* Uncommon NFT */}
      <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 mb-28 rounded-3xl">
        <div className="flex justify-center mb-2">
          <div className="bg-primary border-2 border-[#FF0000] font-a4speed text-3xl pt-4 pb-3 px-12 rounded-full -mt-8 mb-8">
            Uncommon Listed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 mx-12">
          {uncommon.map((item) => {
            return <CollectionTypeCard key={item?.id} category={item} />;
          })}
        </div>
      </div>
      {/* Rare NFT */}
      <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 mb-12 rounded-3xl">
        <div className="flex justify-center mb-2">
          <div className="bg-primary border-2 border-[#FF0000] font-a4speed text-3xl pt-4 pb-3 px-12 rounded-full -mt-8 mb-8">
            Rare Listed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 mx-12">
          {rare.map((item) => {
            return <CollectionTypeCard key={item?.id} category={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default CollectionTypeSection;

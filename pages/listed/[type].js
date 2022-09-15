import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NFTCard from "../../components/utils/NFTCard";
import LazyCard from "../../components/utils/LazyCard";
import Navbar from "../../components/Navbar";

export default function Listed() {
  const router = useRouter();
  const { type } = router.query;
  const [listedNFTs, setListedNFTs] = React.useState({
    data: [],
    fetchStatus: false,
  });

  const getListedNFTs = () => {
    axios
      .get(process.env.baseURL + `/list/${type}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((responce) => {
        setListedNFTs({ data: responce?.data, fetchStatus: true });
        console.log("Listed NFT Responce:", responce?.data);
      });
  };
  console.log("Listing Randering:", listedNFTs);
  React.useEffect(() => {
    if (type) getListedNFTs();
  }, [type]);
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-8 md:mx-12 lg:mx-16 mb-12 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 mx-4">
          {listedNFTs?.data?.length ? (
            listedNFTs?.data.map((token) => {
              if (
                token?.metadata?.name.replace(/\s+/g, "-").toLowerCase() ===
                type
              ) {
                return <NFTCard key={token?.token_id} token={token} />;
              }
            })
          ) : listedNFTs.fetchStatus === true ? (
            <h2 className="text-center text-3xl font-medium">
              No item listed yet!
            </h2>
          ) : (
            [...Array(4)].map((card, index) => {
              return <LazyCard key={"lazy" + index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

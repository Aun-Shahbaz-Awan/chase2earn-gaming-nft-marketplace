import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
// --------------------------------------- wegmi
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
// --------------------------------------- component
import AssetView from "../../components/assets/AssetView";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function Asset() {
  const router = useRouter();
  const { slug } = router.query;
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [tokenInfo, setTokenInfo] = React.useState({});
  const getTokenInfo = () => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/nft/${
          localStorage.getItem("slug").split(",")[0]
        }/${
          localStorage.getItem("slug").split(",")[1]
        }?chain=rinkeby&format=decimal`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key":
              "lEgC4FuVemuR3VBs9GTduYZjNWf5TNB5yWVPOc8mE76MZmFISj0mizqNmmZcKJUV",
          },
        }
      )
      .then((responce) => {
        setTokenInfo(responce?.data);
      });
  };
  // ----------------------------------------------- For Client Side Rendering ----->
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("slug", slug);
      getTokenInfo();
      setLoadingStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <WagmiConfig client={client}>
      <AssetView tokenInfo={tokenInfo} slug={slug} />
    </WagmiConfig>
  );
}

import "../styles/globals.css";
// -----------------------------------------------------
// import { WagmiConfig, createClient } from "wagmi";
// import { getDefaultProvider } from "ethers";

// const client = createClient({
//   autoConnect: true,
//   provider: getDefaultProvider(),
// });
// Choose which chains you'd like to show

import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const chains = [chain.rinkeby];
const alchemyId = process.env.Alchemy_Key;
const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains,
    autoConnect: true,
  })
);

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

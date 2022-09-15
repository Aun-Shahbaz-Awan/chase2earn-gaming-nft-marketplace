import "../styles/globals.css";
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { ContextWrapper } from "../context/state";

const chains = [chain.rinkeby];
const alchemyId = process.env.Alchemy_Key;
const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    autoConnect: true,
    alchemyId,
    chains,
  })
);

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <ContextWrapper>
          <Component {...pageProps} />
        </ContextWrapper>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

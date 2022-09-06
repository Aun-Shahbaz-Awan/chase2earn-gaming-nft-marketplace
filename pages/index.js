import HomePage from "../components/home/HomePage.jsx";
// -----------------------------------------------------
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function Home() {
  return (
    <WagmiConfig client={client}>
      <HomePage />
    </WagmiConfig>
  );
}

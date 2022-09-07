import React, {useState} from "react";
import Image from "next/image";
import Logo from "../assets/Logo.svg";
import { TbAlertCircle } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { useAccount } from "wagmi";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address, isDisconnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState("");
  // const [wallet, setWallet] = React.useState({});
  // Connect Wallet
  // const connectWallet = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       await window.ethereum.enable();
  //       const accounts = await window.ethereum.send("eth_requestAccounts");
  //       const _signer = new ethers.providers.Web3Provider(window.ethereum);
  //       setWallet({
  //         ...wallet,
  //         address: accounts?.result[0],
  //         signer: _signer.getSigner(),
  //         // network: await _signer.getNetwork(),
  //       });
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   } else alert("Please install MetaMask");
  // };
  // Switch Network
  // const handleSwitchNetwork = async () => {
  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: "0x4" }],
  //       });
  //     } catch (error) {
  //       if (error.code === 4902) {
  //         alert("Please add this network to metamask!");
  //       }
  //     }
  //   }
  // };
  // Disconnect Wallet
  // const disconnectWallet = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       console.log("to be coded...");
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   } else alert("Please install MetaMask");
  // };
  // Detect change in Metamask accounts
  // React.useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on("chainChanged", () => connectWallet());
  //     window.ethereum.on("accountsChanged", () => handleSwitchNetwork());
  //   }
  // });
  // Connect wallet on Refresh Page
  React.useEffect(() => {
    setWalletAddress(address)
    // connectWallet();
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <div className="hidden xl:flex justify-between py-4 px-20">
        <div className="w-1/3 my-auto">
          <ul className="flex items-center justify-between">
            <Link href="/">
              <li className="flex items-center text-xl font-semibold cursor-pointer">
                <TbAlertCircle className="mr-1" />
                Home
              </li>
            </Link>

            <li className="flex items-center text-xl font-semibold cursor-pointer">
              <TbAlertCircle className="mr-1" />
              Ecosystem
            </li>
            <li className="flex items-center text-xl font-semibold cursor-pointer">
              <TbAlertCircle className="mr-1" />
              How to Pay
            </li>
          </ul>
        </div>
        <Link href="/">
          <div className="w-1/3 flex justify-center my-auto cursor-pointer">
            <Image src={Logo} alt="Logo" weight="124" />
          </div>
        </Link>

        <div className="w-1/3 my-auto">
          <ul className="flex items-center justify-between">
            <li className="flex items-center text-xl font-semibold cursor-pointer">
              <TbAlertCircle className="mr-1" />
              Pay to Earn
            </li>
            <li>
              {!isDisconnected ? (
                <button
                  // onClick={disconnectWallet}
                  className="text-primary bg-wallet text-base font-semibold px-9 py-3 rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
                >
                  {walletAddress?.slice(0, 5)}...
                  {walletAddress?.slice(-4)}
                </button>
              ) : (
                <button
                  // onClick={connectWallet}
                  className="text-primary bg-wallet text-base font-semibold px-9 py-3 rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
                >
                  Connect
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="flex xl:hidden justify-between py-2 px-6 md:py-4 md:px-20">
        <div className="">
          <Image src={Logo} alt="Logo" weight="124" />
        </div>
        <div className="my-auto" onClick={() => setIsOpen(!isOpen)}>
          <HiMenuAlt3 className=" text-3xl" />
        </div>
      </div>
      {isOpen && (
        <div className="block xl:hidden h-[calc(100vh-130px)] bg-[#000000a9]">
          <ul className="text-center pt-12">
            <li className="flex items-center justify-center text-xl font-semibold py-5">
              <TbAlertCircle className="mr-1" />
              About Us
            </li>
            <li className="flex items-center justify-center text-xl font-semibold py-5">
              <TbAlertCircle className="mr-1" />
              Ecosystem
            </li>
            <li className="flex items-center justify-center text-xl font-semibold py-5">
              <TbAlertCircle className="mr-1" />
              How to Pay
            </li>
            <li className="flex items-center justify-center text-xl font-semibold py-5">
              <TbAlertCircle className="mr-1" />
              Pay to Earn
            </li>
            <li className="py-5">
              <button className="text-primary bg-wallet text-base font-semibold px-9 py-3 rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl">
                Connect Wallet
              </button>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}

export default Navbar;

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../assets/Logo.svg";
// react-icons
import { BiUser } from "react-icons/bi";
import { TbAlertCircle } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
// wamgi
// import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  // const { address, isDisconnected } = useAccount();
  // const [walletAddress, setWalletAddress] = useState("");

  // // Connect wallet on Refresh Page
  // React.useEffect(() => {
  //   setWalletAddress(address);
  //   // connectWallet();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <React.Fragment>
      <div className="hidden xl:flex justify-between py-4 px-20">
        <div className="w-2/5 my-auto">
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
          <div className="w-1/5 flex justify-center my-auto cursor-pointer">
            <Image src={Logo} alt="Logo" weight="124" />
          </div>
        </Link>

        <div className="w-2/5 my-auto">
          <ul className="flex items-center justify-between">
            <li className="flex items-center text-xl font-semibold cursor-pointer">
              <TbAlertCircle className="mr-1" />
              Pay to Earn
            </li>
            <Link href="/account">
              <li className="flex items-center text-xl font-semibold cursor-pointer">
                <BiUser className="mr-1" />
                Profile
              </li>
            </Link>

            <li>
              {/* {!isDisconnected ? (
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
              )} */}
              {/* <ConnectKitButton /> */}
              <ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress, ensName }) => {
                  return (
                    <button
                      className="text-primary bg-wallet text-base font-semibold px-9 py-3 rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
                      onClick={show}
                    >
                      {isConnected
                        ? ensName ?? truncatedAddress
                        : "Connect Wallet"}
                    </button>
                  );
                }}
              </ConnectKitButton.Custom>
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

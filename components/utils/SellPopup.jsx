import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { ethers } from "ethers";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";

export default function SellPriceModal({
  handleSellToken,
  sellPriceModel,
  setSellPriceModel,
  token,
}) {
  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() =>
            setSellPriceModel((sellPriceModel) => ({
              ...sellPriceModel,
              openStatus: true,
            }))
          }
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={sellPriceModel?.openStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            setSellPriceModel((sellPriceModel) => ({
              ...sellPriceModel,
              openStatus: false,
            }))
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-400 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full font-play max-w-md transform overflow-hidden rounded-2xl bg-stone-900 p-7 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    onClick={() =>
                      setSellPriceModel((sellPriceModel) => ({
                        ...sellPriceModel,
                        openStatus: false,
                      }))
                    }
                    className="text-2xl font-semibold font-play leading-6 flex items-center justify-between"
                  >
                    <span>List NFT Sell Order</span>
                    <span className="cursor-pointer">
                      <FaRegTimesCircle />
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <span className="py-0.5 px-2 bg-gray-500 text-sm font-medium rounded-lg">
                      {"#000" + token?.token_id}
                    </span>
                    <div className="flex justify-between items-center text-base pt-10 pb-3">
                      <span className="font-semibbold text-gray-400">NFT</span>
                      <span>
                        {token?.metadata
                          ? JSON.parse(token.metadata)?.name
                          : "Loading..."}
                      </span>
                    </div>
                    <span>
                      Selling Price <span className="text-red-500">*</span>
                    </span>
                    <div className="flex justify-between items-center border border-gray-400 rounded-lg mt-1">
                      <input
                        value={sellPriceModel?.price}
                        type="number"
                        onChange={(e) =>
                          setSellPriceModel((sellPriceModel) => ({
                            ...sellPriceModel,
                            price: e.target.value,
                          }))
                        }
                        className="bg-transparent w-full text-lg py-2 px-4 outline-none"
                      />
                      <span className="pr-4">ETH</span>
                    </div>
                    <span className="text-right text-xs text-red-300 ml-1">
                      {sellPriceModel?.price >= 0.000000000000000001 ||
                      sellPriceModel?.price === 0
                        ? ""
                        : "Price must be greater then 0.000000000000000001ETH"}
                    </span>

                    <div className="flex justify-between items-center text-base pt-10 pb-3">
                      <span className="font-semibbold text-gray-400">
                        Listing Fee
                      </span>
                      <span>0%</span>
                    </div>
                    <span className="py-3 text-sm text-gray-400 leading-3">
                      *Trade fee changes from selling price for every successful
                      transition.
                    </span>
                    <div className="flex items-center py-2 px-3 mt-2 rounded-md text-sm bg-green-300 opacity-50 text-green-700">
                      <AiOutlineWarning className="text-3xl ml-1" />
                      <span className="pl-3">
                        * If the NFT is Listing for Sale, it cannot be used in
                        the game acitivity.
                      </span>
                    </div>
                    {/* <div className="flex justify-end">
                      <p className="text-primary mt-1 pr-2">
                        {ethers.utils.formatEther(
                          sellPriceModel?.price
                            ? Math.trunc(sellPriceModel?.price)
                            : 0
                        )}{" "}
                        Eth
                      </p>
                    </div> */}
                  </div>

                  <div className="mt-6 flex justify-end items-center">
                    <button
                      type="button"
                      placeholder="Enter Listing Price in Ethereum"
                      className="inline-flex justify-center rounded-lg mr-4 bg-transparent px-8 py-2 text-md font-medium text-gray-400 border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setSellPriceModel((sellPriceModel) => ({
                          ...sellPriceModel,
                          openStatus: false,
                        }));
                      }}
                    >
                      Cancle
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-green-400 text-green-900 disabled:bg-red-400 disabled:text-red-900 px-8 py-2 text-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={sellPriceModel?.price <= 0.000000000000000001}
                      onClick={() => {
                        setSellPriceModel((sellPriceModel) => ({
                          ...sellPriceModel,
                          openStatus: false,
                        }));
                        handleSellToken();
                      }}
                    >
                      List
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

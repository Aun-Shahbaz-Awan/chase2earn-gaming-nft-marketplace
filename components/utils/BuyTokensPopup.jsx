import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { ethers } from "ethers";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";

export default function BuyTokenModal({
  handleBuyTokens,
  buyTokensModel,
  setBuyTokensModel,
}) {
  return (
    <>
      <Transition appear show={buyTokensModel?.openStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            setBuyTokensModel((buyTokensModel) => ({
              ...buyTokensModel,
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
                      setBuyTokensModel((buyTokensModel) => ({
                        ...buyTokensModel,
                        openStatus: false,
                      }))
                    }
                    className="text-2xl font-semibold font-play leading-6 flex items-center justify-between"
                  >
                    <span>Buy TTL Tokens</span>
                    <span className="cursor-pointer">
                      <FaRegTimesCircle />
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <span className="py-0.5 px-2 bg-gray-500 text-sm font-medium rounded-lg">
                      TTL
                    </span>
                    <div className="flex justify-between items-center text-base pt-10 pb-3">
                      <span className="font-semibbold text-gray-400">
                        Token
                      </span>
                      <span>Throttle</span>
                    </div>
                    <span>
                      Buying Amount (wei){" "}
                      <span className="text-red-500">*</span>
                    </span>
                    <div className="flex justify-between items-center border border-gray-400 rounded-lg mt-1">
                      <input
                        value={buyTokensModel?.token}
                        type="number"
                        onChange={(e) =>
                          setBuyTokensModel((buyTokensModel) => ({
                            ...buyTokensModel,
                            tokens: e.target.value,
                          }))
                        }
                        className="bg-transparent w-full text-lg py-2 px-4 outline-none"
                      />
                      <span className="pr-4">TTL</span>
                    </div>
                    <span className="text-right text-xs text-red-300 ml-1">
                      {buyTokensModel?.tokens >= 1 ||
                      buyTokensModel?.tokens === 0
                        ? ""
                        : "Price must be greater then 1 TTL(WEI)"}
                    </span>

                    <div className="flex justify-between items-center text-base pt-10 pb-3">
                      <span className="font-semibbold text-gray-400">
                        Buying Fee
                      </span>
                      <span>0%</span>
                    </div>
                    <span className="py-3 text-sm text-gray-400 leading-3">
                      *Trade fee changes from buying price for every successfull
                      transition.
                    </span>
                    <div className="flex items-center py-2 px-3 mt-2 rounded-md text-sm bg-green-300 opacity-50 text-green-700">
                      <AiOutlineWarning className="text-3xl ml-1" />
                      <span className="pl-3">
                        * You can use TTL tokens in Game to buy car accessories.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end items-center">
                    <button
                      type="button"
                      placeholder="Enter Listing Price in Ethereum"
                      className="inline-flex justify-center rounded-lg mr-4 bg-transparent px-8 py-2 text-md font-medium text-gray-400 border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setBuyTokensModel((buyTokensModel) => ({
                          ...buyTokensModel,
                          openStatus: false,
                        }));
                      }}
                    >
                      Cancle
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-green-400 text-green-900 disabled:bg-red-400 disabled:text-red-900 px-8 py-2 text-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={buyTokensModel?.tokens < 1}
                      onClick={() => {
                        handleBuyTokens();
                        setBuyTokensModel((buyTokensModel) => ({
                          ...buyTokensModel,
                          openStatus: false,
                        }));
                      }}
                    >
                      Buy TTL
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

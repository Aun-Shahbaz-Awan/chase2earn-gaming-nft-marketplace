import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ethers } from "ethers";

export default function SellPriceModal({
  handleSellToken,
  sellPriceModel,
  setSellPriceModel,
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 pl-2"
                  >
                    Add Listing Price
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      value={sellPriceModel?.price}
                      type="number"
                      onChange={(e) =>
                        setSellPriceModel((sellPriceModel) => ({
                          ...sellPriceModel,
                          price: Math.trunc(e.target.value),
                        }))
                      }
                      className="text-primary w-full text-lg py-2 px-4 outline-none rounded-full border-2 border-primary"
                    />
                    <div className="flex justify-end">
                      <p className="text-primary mt-1 pr-2">
                        {ethers.utils.formatEther(
                          sellPriceModel?.price
                            ? Math.trunc(sellPriceModel?.price)
                            : 0
                        )}{" "}
                        Eth
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-blue-200 px-8 py-2 text-md font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleSellToken();
                        setSellPriceModel((sellPriceModel) => ({
                          ...sellPriceModel,
                          openStatus: false,
                        }));
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

import CopyButton from "./copy-button";
import ChevronDown from "../svg/ChevronDown";
import { useState } from "react";
import { useDisconnect } from "@starknet-react/core";


export default function AddressBar({ address }) {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const { disconnect, status } = useDisconnect({});

  const disconnectWallet = () => {
    disconnect();

    // switch (status) {
    //   case "error":
    //     console.log("Error occured while trying to disconnect wallet. Try again");
    //     break;

    //   case "pending":
    //     console.log("Trying to disconnect...");
    //     break;

    //   case "success":
    //     console.log("Disconnecteed successfully.");
    //     break;

    //   default:
    //     console.log("Unexpected behaviour occured. Please refreesh page.");
    //     break;
    // }
  }

  return (
    <div className="relative">
      <div
        role="combobox"
        aria-expanded={showDisconnect}
        aria-controls="disconnect-box"
        className="text-sm bg-[#F6F6F6] text-[#6F6F6F] flex gap-x-2 items-center py-[10px] rounded-full px-6"
        onClick={() => setShowDisconnect((prev) => !prev)}
      >
        {address.slice(0, 6)}...{address.slice(-4)}{" "}
        <CopyButton copyText={address || ""} />
        <span
          className={`${showDisconnect ? "-rotate-180" : ""
            } transition-all duration-500`}
        >
          <ChevronDown />
        </span>
      </div>
      <div
        id="disconnect-box"
        role="listbox"
        className={`absolute left-[20px] top-[45px] z-[10] grid -translate-x-1/2 overflow-hidden rounded-xl text-base leading-5 transition-all duration-300 ease-in-out w-[200px] md:translate-x-0 ${showDisconnect
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-center text-white bg-[#5B9EF7]  hover:bg-opacity-80 transition-all duration-200 ease-in border-[2px] border-solid border-[#F6F6F6]"
            onClick={() => {
              setShowDisconnect(false);
              disconnectWallet();
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

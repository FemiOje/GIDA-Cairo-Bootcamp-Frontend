import { useAccount, useBalance } from "@starknet-react/core";
import { useMemo, useState, useEffect } from "react";
import { formatAmount } from "../lib/helpers";

export default function Balance() {
  const { address: accountAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Fix N/A balance on first render
  // TODO: Fix renders correct balance and then N/A after short interval on subsequent renders
  const { data, error, isLoading: isBalanceLoading } = useBalance({
    address: accountAddress,
    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    enabled: !!accountAddress,  // Only fetch if address is valid
  });

  useEffect(() => {
    if (!isBalanceLoading) {
      setIsLoading(false);
    }
  }, [isBalanceLoading]);

  const formattedBalance = useMemo(() => {
    if (data && data.formatted) {
      return `${formatAmount(data.formatted)} ${data.symbol}`;
    }
    return "N/A";
  }, [data]);

  return (
    <div className="flex gap-x-3 items-center text-[#6F6F6F] text-base leading-6">
      <h3>Wallet balance</h3>
      <div className="w-[1px] h-3 rounded bg-[#D9D9D9]"></div>
      {
        isLoading || error || !accountAddress ?
          <h4 className="font-semibold">Wallet not connected</h4> :
          <h4 className="font-semibold">{formattedBalance}</h4>
      }
    </div>
  );
}

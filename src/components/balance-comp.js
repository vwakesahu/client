import { Coins } from "lucide-react";
import React from "react";

const BalanceComponent = () => {
  return (
    <div className="flex gap-2">
      <Coins />
      <p>1324</p>
    </div>
  );
};

export default BalanceComponent;
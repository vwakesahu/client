import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Blocks } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { WalletConnectDemo } from "./dynamic-island";

// <div className="relative">
// <div
//   className="fixed inset-0 mix-blend-hard-light pointer-events-none"
//   style={{ backgroundImage: "url('/cult-noise.png')" }}
// ></div>
//       <div className="relative">{children}</div>
//     </div>

export function Announcement() {
  return <WalletConnectDemo />;
}

"use client";

import {
  Wallet,
  WalletCards,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "./cult-components/dynamic-island";

const WalletAction = () => {
  const { state: blobState, setSize } = useDynamicIslandSize();

  // Define wallet connection states
  const walletStates = [
    "initial", // Compact: Show connect wallet button
    "connecting", // Large: Loading state
    "select", // Medium: Select wallet type
    "connected", // Long: Show connected address
    "error", // Tall: Show error message
  ];

  useScheduledAnimations([
    { size: "compact", delay: 1000 },
    { size: "large", delay: 1500 },
    { size: "medium", delay: 2000 },
    { size: "long", delay: 2500 },
    { size: "tall", delay: 3000 },
  ]);

  // Initial compact state - Connect Wallet button
  const renderCompactState = () => (
    <DynamicContainer className="flex items-center justify-between px-4 h-full w-full">
      <DynamicDescription className="flex items-center text-white">
        <Wallet className="h-5 w-5 mr-2 text-cyan-400" />
        Connect Wallet
      </DynamicDescription>

      <Badge variant="outline" className="text-cyan-400">
        Web3
      </Badge>
    </DynamicContainer>
  );

  // Loading state while connecting
  const renderLargeState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="flex items-center gap-4 px-4">
        <Loader2 className="animate-spin h-8 w-8 text-cyan-400" />
        <DynamicTitle className="text-xl font-bold text-white">
          Connecting to Wallet...
        </DynamicTitle>
      </div>
    </DynamicContainer>
  );

  // Wallet selection state
  const renderMediumState = () => (
    <DynamicContainer className="flex flex-col p-4 h-full">
      <DynamicTitle className="text-lg font-bold text-white mb-2">
        Select Your Wallet
      </DynamicTitle>

      <div className="grid grid-cols-2 gap-2">
        <Button className="flex items-center justify-center">
          <WalletCards className="mr-2 h-4 w-4" /> MetaMask
        </Button>
        <Button className="flex items-center justify-center">
          <Wallet className="mr-2 h-4 w-4" /> WalletConnect
        </Button>
      </div>
    </DynamicContainer>
  );

  // Connected state showing address
  const renderLongState = () => (
    <DynamicContainer className="flex items-center justify-between px-4 h-full w-full">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-6 w-6 text-green-400" />
        <DynamicTitle className="text-white font-medium">
          0x1234...5678
        </DynamicTitle>
      </div>
      <Button variant="outline" size="sm">
        Disconnect
      </Button>
    </DynamicContainer>
  );

  // Error state
  const renderTallState = () => (
    <DynamicContainer className="flex flex-col p-4 gap-2">
      <div className="flex items-center gap-2">
        <XCircle className="h-6 w-6 text-red-400" />
        <DynamicTitle className="text-lg font-bold text-white">
          Connection Failed
        </DynamicTitle>
      </div>
      <DynamicDescription className="text-neutral-400">
        Please check if your wallet is unlocked and try again.
      </DynamicDescription>
      <Button className="mt-2">Try Again</Button>
    </DynamicContainer>
  );

  // Render state based on current size
  function renderState() {
    switch (blobState.size) {
      case "compact":
        return renderCompactState();
      case "large":
        return renderLargeState();
      case "medium":
        return renderMediumState();
      case "long":
        return renderLongState();
      case "tall":
        return renderTallState();
      default:
        return renderCompactState();
    }
  }

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="absolute top-12 left-1">
          <Button
            onClick={() => {
              const currentIndex = walletStates.indexOf(blobState.size);
              const nextIndex = (currentIndex + 1) % walletStates.length;
              setSize(walletStates[nextIndex]);
            }}
            disabled={blobState.isAnimating}
            className="mt-4 p-2 border rounded-md"
          >
            Cycle States
          </Button>
        </div>

        <div className="absolute top-1 right-2">
          <Badge variant="outline">{blobState.size}</Badge>
        </div>

        <DynamicIsland id="wallet-blob">{renderState()}</DynamicIsland>
      </div>
    </div>
  );
};

export function WalletDynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize="compact">
      <WalletAction />
    </DynamicIslandProvider>
  );
}

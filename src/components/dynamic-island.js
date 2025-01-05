"use client";

import { useState, useEffect } from "react";
import { Wallet, Loader, Shield, AlertCircle, Mail, User } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { useOCAuth } from "@opencampus/ocid-connect-js";

import { Button } from "@/components/ui/button";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  SIZE_PRESETS,
} from "@/components/ui/dynamic-island";
import { useWalletContext } from "@/privy/walletContext";

const LOGIN_METHOD_ICONS = {
  email: Mail,
  wallet: Wallet,
  google: User,
  ocid: Shield,
};

const LOGIN_METHOD_NAMES = {
  email: "Email",
  wallet: "Wallet",
  google: "Google",
  ocid: "OCID",
};

const CombinedAuth = () => {
  const { setSize } = useDynamicIslandSize();
  const { address } = useWalletContext();
  const {
    authenticated: privyAuthenticated,
    ready,
    login: privyLogin,
    logout: privyLogout,
  } = usePrivy();
  const { authState: ocidAuthState, ocAuth, OCId } = useOCAuth();

  const [loginState, setLoginState] = useState("initial");
  const [isProcessing, setIsProcessing] = useState(false);

  // Formatting helpers
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatOCID = (ocid) => {
    if (!ocid) return "";
    return ocid.length > 10 ? `${ocid.slice(0, 10)}...` : `${ocid}`;
  };

  const getDisplayText = () => {
    if (OCId) {
      return formatOCID(OCId);
    }
    return formatAddress(address);
  };

  // Handle authentication state changes
  useEffect(() => {
    if (privyAuthenticated && ocidAuthState.isAuthenticated) {
      setLoginState("connected");
      setSize(SIZE_PRESETS.COMPACT);
      setIsProcessing(false);
    } else if (privyAuthenticated && !ocidAuthState.isAuthenticated) {
      setLoginState("need_ocid");
      setSize(SIZE_PRESETS.MEDIUM);
      setIsProcessing(false);
    } else {
      setLoginState("initial");
      setSize(SIZE_PRESETS.COMPACT);
      setIsProcessing(false);
    }
  }, [privyAuthenticated, ocidAuthState?.isAuthenticated, setSize]);

  const showLoginOptions = async () => {
    try {
      setIsProcessing(true);
      setLoginState("connecting");
      setSize(SIZE_PRESETS.LARGE);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoginState("options");
      setSize(SIZE_PRESETS.MEDIUM);
    } catch (error) {
      console.error("Error showing options:", error);
      setLoginState("error");
      setSize(SIZE_PRESETS.COMPACT_MEDIUM);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrivyLogin = async (method) => {
    try {
      setIsProcessing(true);
      setLoginState("connecting");
      setSize(SIZE_PRESETS.LARGE);

      await privyLogin({
        loginMethods: [method],
        onSuccess: () => {
          setLoginState("need_ocid");
          setSize(SIZE_PRESETS.MEDIUM);
        },
        onError: (error) => {
          console.error("Login error:", error);
          setLoginState("error");
          setSize(SIZE_PRESETS.COMPACT_MEDIUM);
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      setLoginState("error");
      setSize(SIZE_PRESETS.COMPACT_MEDIUM);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOCIDLogin = async () => {
    try {
      setIsProcessing(true);
      setLoginState("connecting");
      setSize(SIZE_PRESETS.LARGE);

      await ocAuth.signInWithRedirect({
        state: "opencampus",
        wallet_address: address, // Pass the connected wallet address
      });
    } catch (error) {
      console.error("OCID localhostgin error:", error);
      setLoginState("error");
      setSize(SIZE_PRESETS.COMPACT_MEDIUM);
      setIsProcessing(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setIsProcessing(true);
      await Promise.all([privyLogout(), ocAuth.signOut()]);
      setLoginState("initial");
      setSize(SIZE_PRESETS.COMPACT);
    } catch (error) {
      console.error("Logout error:", error);
      setLoginState("error");
      setSize(SIZE_PRESETS.COMPACT_MEDIUM);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCompactState = () => (
    <DynamicContainer className="w-full h-full px-6">
      <Button
        onClick={showLoginOptions}
        disabled={isProcessing}
        className="w-full h-full bg-transparent hover:bg-transparent p-0 border-none shadow-none"
      >
        <div className="relative w-full flex items-center">
          <DynamicDescription className="my-auto text-lg font-medium text-white">
            <Wallet className="h-5 w-5 fill-cyan-400 text-cyan-400" />
          </DynamicDescription>
          <DynamicDescription className="my-auto text-lg text-center w-full font-bold text-white">
            Connect Account
          </DynamicDescription>
        </div>
      </Button>
    </DynamicContainer>
  );

  const renderLoadingState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative flex w-full items-center justify-between gap-6 px-4">
        <Loader className="animate-spin h-12 w-12 text-cyan-400" />
        <DynamicTitle className="my-auto text-2xl font-black tracking-tighter text-white">
          Connecting...
        </DynamicTitle>
      </div>
    </DynamicContainer>
  );

  const renderOptionsState = () => (
    <DynamicContainer className="flex flex-col justify-between px-2 pt-4 text-left text-white h-full">
      <DynamicTitle className="text-2xl pl-3 font-black tracking-tighter">
        Choose Login Method
      </DynamicTitle>
      <DynamicDescription className="leading-5 text-neutral-500 pl-3">
        Connect your wallet first
      </DynamicDescription>

      <DynamicDiv className="flex flex-col mt-auto space-y-1 mb-2 bg-neutral-700 p-2 rounded-b-2xl">
        {["wallet", "email"].map((method) => {
          const IconComponent = LOGIN_METHOD_ICONS[method];
          return (
            <Button
              key={method}
              onClick={() => handlePrivyLogin(method)}
              disabled={isProcessing}
              className="mt-1"
            >
              <IconComponent className="mr-2 h-4 w-4 fill-cyan-400 text-cyan-400" />
              {LOGIN_METHOD_NAMES[method]}
            </Button>
          );
        })}
      </DynamicDiv>
    </DynamicContainer>
  );

  const renderNeedOCIDState = () => (
    <DynamicContainer className="flex flex-col justify-between px-2 pt-4 text-left text-white h-full">
      <DynamicTitle className="text-2xl pl-3 font-black tracking-tighter">
        Connect OCID
      </DynamicTitle>
      <DynamicDescription className="leading-5 text-neutral-500 pl-3">
        Wallet connected: {formatAddress(address)}
      </DynamicDescription>

      <DynamicDiv className="flex flex-col mt-auto space-y-1 mb-2 bg-neutral-700 p-2 rounded-b-2xl">
        <Button
          onClick={handleOCIDLogin}
          disabled={isProcessing}
          className="mt-1"
        >
          <Shield className="mr-2 h-4 w-4 fill-cyan-400 text-cyan-400" />
          Connect OCID
        </Button>
      </DynamicDiv>
    </DynamicContainer>
  );

  const renderConnectedState = () => (
    <DynamicContainer className="w-full h-full px-8">
      <Button
        onClick={handleDisconnect}
        disabled={isProcessing}
        className="w-full h-full bg-transparent hover:bg-transparent p-0 shadow-none border-none"
      >
        <div className="relative w-full flex items-center">
          <DynamicDescription className="my-auto text-lg font-medium text-white">
            <Shield className="h-5 w-5 fill-cyan-400 text-cyan-400" />
          </DynamicDescription>
          <DynamicDescription className="w-full text-center my-auto text-lg font-bold text-white">
            {getDisplayText()}
          </DynamicDescription>
        </div>
      </Button>
    </DynamicContainer>
  );

  const renderErrorState = () => (
    <DynamicContainer
      className="flex items-center justify-center h-full w-full cursor-pointer"
      onClick={() => {
        setLoginState("initial");
        setSize(SIZE_PRESETS.COMPACT);
      }}
    >
      <div className="relative flex w-full items-center justify-between gap-6 px-4">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <DynamicTitle className="my-auto text-xl font-black tracking-tighter text-white">
          Connection Failed
        </DynamicTitle>
      </div>
    </DynamicContainer>
  );

  if (!ready) {
    return null;
  }

  const renderState = () => {
    switch (loginState) {
      case "connecting":
        return renderLoadingState();
      case "options":
        return renderOptionsState();
      case "need_ocid":
        return renderNeedOCIDState();
      case "connected":
        return renderConnectedState();
      case "error":
        return renderErrorState();
      default:
        return renderCompactState();
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 h-full">
        <DynamicIsland id="wallet-connect">{renderState()}</DynamicIsland>
      </div>
    </div>
  );
};

export function WalletConnectDemo() {
  return (
    <DynamicIslandProvider initialSize={SIZE_PRESETS.COMPACT}>
      <div>
        <CombinedAuth />
      </div>
    </DynamicIslandProvider>
  );
}

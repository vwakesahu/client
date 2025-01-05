import { educhainNetwork } from "./chains";

export const privyConfig = {
  appId: "cm2vpnu5606elij5dxqxknyhx",
  config: {
    logo: "https://your.logo.url",
    appearance: { theme: "dark" },
    loginMethods: ["wallet"],
    appearance: {
      walletList: ["metamask", "detected_wallets", "rainbow"],
      theme: "dark",
    },
    defaultChain: educhainNetwork,
    supportedChains: [educhainNetwork],
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
    },
  },
};
import { createContext, useContext, useEffect, useState } from "react";
import { init, createFhevmInstance } from "./fhe-functions";
import { useWallets } from "@privy-io/react-auth";

const FhevmContext = createContext({
  instance: null,
  loading: true,
});

export const FhevmProvider = ({ children }) => {
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { wallets } = useWallets();
  const w0 = wallets[0];

  useEffect(() => {
    const initializeFhevm = async () => {
      try {
        await init();
        const fhevmInstance = await createFhevmInstance();
        setInstance(fhevmInstance);
        console.log("FHEVM instance created successfully!");
      } catch (error) {
        console.error("Failed to initialize FHEVM:", error);
      } finally {
        setLoading(false);
      }
    };

    if (w0) {
      initializeFhevm();
    }
  }, [w0]);

  return (
    <FhevmContext.Provider value={{ instance, loading }}>
      {children}
    </FhevmContext.Provider>
  );
};

export const useFhevm = () => useContext(FhevmContext);

import { isAddress } from "ethers";
import { initFhevm, createInstance } from "fhevmjs/bundle";

const ACL_ADDRESS = "0x9479B455904dCccCf8Bc4f7dF8e9A1105cBa2A8e";
const KMS_ADDRESS = "0x904Af2B61068f686838bD6257E385C2cE7a09195";

let instancePromise;
let instance;
const keypairs = {};

export const init = async () => {
  await initFhevm({ thread: navigator.hardwareConcurrency });
};

export const createFhevmInstance = async () => {
  if (instancePromise) return instancePromise;

  instancePromise = createInstance({
    network: window.ethereum,
    aclContractAddress: ACL_ADDRESS,
    kmsContractAddress: KMS_ADDRESS,
    gatewayUrl: "https://gateway.sepolia.zama.ai/",
  });

  instance = await instancePromise;
  return instance;
};

export const setKeypair = (contractAddress, userAddress, keypair) => {
  if (!isAddress(contractAddress) || !isAddress(userAddress)) return;
  if (!keypairs[userAddress]) keypairs[userAddress] = {};
  keypairs[userAddress][contractAddress] = keypair;
};

export const getKeypair = (contractAddress, userAddress) => {
  if (!isAddress(contractAddress) || !isAddress(userAddress)) return null;
  return keypairs[userAddress]
    ? keypairs[userAddress][contractAddress] || null
    : null;
};

export const getInstance = () => {
  return instance;
};

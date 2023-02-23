import {ExternalProvider} from "@ethersproject/providers";
import {ethers} from "ethers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;

export const signer = provider? provider.getSigner(): undefined;

export const getAccountAddress = async () => {
  if (!window.ethereum){
    return null;
  }
  await provider?.send("eth_requestAccounts", []);
  return provider?.getSigner().getAddress();
}

export const getAccountBalance = async () => {
  if (!window.ethereum){
    return null;
  }
  await provider?.send("eth_requestAccounts", []);
  const balance = await provider?.getSigner().getBalance();
  return ethers.utils.formatEther(balance ?? 0);
}
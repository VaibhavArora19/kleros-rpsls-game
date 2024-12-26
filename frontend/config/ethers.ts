import { ethers } from "ethers";

export const getSigner = async () => {
  //@ts-expect-error metamask might not be installed
  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  return signer;
};

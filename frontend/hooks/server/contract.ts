import axios from "axios";

export const useManageSmartContract = () => {
  const createSmartContract = async (contractAddress: string) => {
    try {
      const { data } = await axios.post("/api/contract-address", {
        contractAddress,
      });

      console.log("Created smart contract: ", data);
    } catch (error) {
      console.error("error creating smart contract: ", error);
    }
  };

  return {
    createSmartContract,
  };
};

import { SERVER } from "@/constants/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSmartContractAddress = () => {
  const getSmartContractAddress = async () => {
    try {
      const { data } = await axios.get("/api/contract-address");

      console.log("Smart contract: ", data);

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      return data.contract;
    } catch (error) {
      console.error("error getting smart contract: ", error);
    }
  };

  return useQuery({
    queryKey: [SERVER.GET_CONTRACT_ADDRESS],
    queryFn: getSmartContractAddress,
    refetchOnWindowFocus: false,
  });
};

export const useSaveSmartContractAddress = () => {
  const saveSmartContractAddress = async (contractAddress: string) => {
    try {
      const { data } = await axios.post("/api/contract-address", {
        contractAddress,
      });

      console.log("Created smart contract: ", data);
    } catch (error) {
      console.error("error creating smart contract: ", error);
    }
  };

  return useMutation({
    mutationKey: [SERVER.SAVE_CONTRACT_ADDRESS],
    mutationFn: saveSmartContractAddress,
  });
};

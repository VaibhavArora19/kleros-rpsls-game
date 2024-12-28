import { SERVER } from "@/constants/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSmartContractAddress = () => {
  const getSmartContractAddress = async () => {
    try {
      const { data } = await axios.get("/api/contract-address");

      console.log("Smart contract: ", data);

      return data.contractAddress;
    } catch (error: any) {
      console.error("error getting smart contract: ", error);
      //   throw new Error(error.message);
    }
  };

  return useQuery({
    queryKey: [SERVER.GET_CONTRACT_ADDRESS],
    queryFn: getSmartContractAddress,
    refetchOnWindowFocus: false,
    retry: 0,
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

export const useDeleteSmartContractAddress = () => {
  const useDeleteSmartContractAddress = async () => {
    try {
      const { data } = await axios.delete("/api/contract-address");

      console.log("Deleted smart contract: ", data);
    } catch (error) {
      console.error("error deleting smart contract: ", error);
    }
  };

  return useMutation({
    mutationKey: [SERVER.DELETE_CONTRACT_ADDRESS],
    mutationFn: useDeleteSmartContractAddress,
  });
};

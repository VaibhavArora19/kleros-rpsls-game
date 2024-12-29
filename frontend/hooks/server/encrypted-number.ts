import { ENCRYPTED_NUMBER } from "@/constants/query";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetEncryptedNumber = () => {
  const getEncryptedNumber = async () => {
    try {
      const { data } = await axios.get("/api/encrypted-number");

      return data.encryptedNumber;
    } catch (error) {
      console.error("error getting encrypted number: ", error);
    }
  };

  return useMutation({
    mutationKey: [ENCRYPTED_NUMBER.GET_ENCRYPTED_NUMBER],
    mutationFn: getEncryptedNumber,
  });
};

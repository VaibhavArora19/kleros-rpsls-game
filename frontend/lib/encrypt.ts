import { encrypt } from "@metamask/eth-sig-util";

export const encryptNumber = async (userAddress: string, number: number) => {
  //@ts-expect-error metamask might not be installed
  const pubKey = await window.ethereum.request({
    method: "eth_getEncryptionPublicKey",
    params: [userAddress],
  });

  const buf = Buffer.from(
    JSON.stringify(
      encrypt({
        publicKey: pubKey,
        data: JSON.stringify(number.toString()),
        version: "x25519-xsalsa20-poly1305",
      })
    ),
    "utf-8"
  );

  console.log("encryptedValue", buf);

  return "0x" + buf.toString("hex");
};

export const decryptNumber = async (userAddress: string, encryptedMessage: string) => {
  console.log("user address is", userAddress);
  //@ts-expect-error metamask might not be installed
  const decryptedNumber = await window.ethereum.request({
    method: "eth_decrypt",
    params: [encryptedMessage, userAddress],
  });

  return JSON.parse(decryptedNumber);
};

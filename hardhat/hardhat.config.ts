import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.4.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};

export default config;

import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "mainnet",
  networks: {
    mainnet: {
      url: MAINNET_RPC_URL,
      chainId: 1,
    },
  },
};
export default config;

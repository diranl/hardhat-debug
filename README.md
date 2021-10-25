# alchemy

Alchemy testing script.

## Prerequisites

- Node (>= v14.18.1)
- Yarn
- NPX, see https://www.npmjs.com/package/npx

### Alchemy API

An Alchemy API key is expect to be associated with the following environment variable: `ALCHEMY_MAINNET_RPC_URL`

To set the env variable:

- run `export ALCHEMY_MAINNET_RPC_URL="...insert API key here..."`

## Installation

- run `yarn` inside the root folder, this will install all the libraries needed

## Running

- run `yarn start` to run the alchemy script

### Example output

```
Retrieved proposal: JSON=[{"type":"BigNumber","hex":"0x1a"},"0x54A37d93E57c5DA659F508069Cf65A381b61E189",{"type":"BigNumber","hex":"0x5f85bb3f"},{"type":"BigNumber","hex":"0xa81d1a"},{"type":"BigNumber","hex":"0xa8609a"},{"type":"BigNumber","hex":"0x62cec6787569791a4e25"},{"type":"BigNumber","hex":"0x0e49d5cacebb28c2"},false,true]
HardhatError: HH109: Network connection timed out.
Please check your internet connection and networks config
    at HttpProvider._fetchJsonRpcResponse (/git/alchemy/node_modules/hardhat/src/internal/core/providers/http.ts:184:15)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
    at runNextTicks (internal/process/task_queues.js:64:3)
    at listOnTimeout (internal/timers.js:526:9)
    at processTimers (internal/timers.js:500:7)
    at HttpProvider.request (/git/alchemy/node_modules/hardhat/src/internal/core/providers/http.ts:55:29)
    at EthersProviderWrapper.send (/git/alchemy/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)

    Caused by: FetchError: network timeout at: https://eth-mainnet.alchemyapi.io/v2/[redacted]
        at Timeout.<anonymous> (/git/alchemy/node_modules/node-fetch/lib/index.js:1476:13)
        at listOnTimeout (internal/timers.js:557:17)
        at processTimers (internal/timers.js:500:7)
```

import Web3Modal from "web3modal";
import supportedChains from "./chains";
import { IChainData } from "./types";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import Authereum from "authereum";

/**
 * Represents get chan data through chain.
 * @getChainData
 * @param {number} chainId - This is chain id.
 */
export const getChainData = (chainId?: number): IChainData | null => {
	if (!chainId) {
		return null;
	}
	const chainData = supportedChains.filter(
		(chain: any) => chain.chain_id === chainId
	)[0];

	if (!chainData) {
		throw new Error("ChainId missing or not supported");
	}

	const API_KEY = process.env.REACT_APP_API_KEY;

	if (
		chainData.rpc_url.includes("infura.io") &&
		chainData.rpc_url.includes("%API_KEY%") &&
		API_KEY
	) {
		const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

		return {
			...chainData,
			rpc_url: rpcUrl,
		};
	}

	return chainData;
};

/** This is customize network options. */
const customNetworkOptions = {
	rpcUrl: process.env.REACT_APP_RPC_URL,
	chainId: 1,
};

/**
 * Represents provider option for web3 modal.
 * @providerOptions
 */
export const providerOptions = {
	coinbasewallet: {
		package: CoinbaseWalletSDK,
		options: {
			appName: "My Awesome App",
			infuraId: process.env.REACT_APP_INFURA_ID,
			rpc: "",
			chainId: 1,
			darkMode: false,
		},
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			appName: "Wallet Connect",
			infuraId: process.env.REACT_APP_INFURA_ID,
		},
	},

	fortmatic: {
		package: Fortmatic,
		options: {
			key: process.env.REACT_APP_FORTMATIC_ID,
			network: customNetworkOptions,
		},
	},

	torus: {
		package: Torus,
	},
	portis: {
		package: Portis,
		options: {
			id: process.env.REACT_APP_PORTIS_ID,
		},
	},
	authereum: {
		package: Authereum,
	},
};

/**
 * Represents web3 modal instance.
 * @web3Modal
 */
export const web3Modal = () => {
	if (typeof window !== "undefined") {
		const web3Modal = new Web3Modal({
			network: "mainnet",
			cacheProvider: true,
			providerOptions,
		});
		return web3Modal;
	}
};

/**
 * Represents when metamask and coinbase is installed function.
 * @activateInjectedProvider
 * @param {"MetaMask" | "CoinBase"} providerName - This is provider name.
 */
export const activateInjectedProvider = (
	providerName: "MetaMask" | "CoinBase"
) => {
	if (typeof window !== "undefined") {
		const { ethereum } = window as any;

		if (!ethereum?.providers) {
			return undefined;
		}

		let provider;
		switch (providerName) {
			case "CoinBase":
				provider = ethereum.providers.find(
					({ isCoinbaseWallet }: any) => isCoinbaseWallet
				);
				break;
			case "MetaMask":
				provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
				break;
		}

		if (provider) {
			ethereum.setSelectedProvider(provider);
		}
	}
};

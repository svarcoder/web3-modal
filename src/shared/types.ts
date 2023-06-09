/** This is all typescript interface. */
export type StateType = {
	provider?: any;
	web3Provider?: any;
	address?: string;
	chainId?: number;
	blockNumber?: number;
	balance?: string;
};

export interface IAssetData {
	symbol: string;
	name: string;
	decimals: string;
	contractAddress: string;
	balance?: string;
}

export interface IChainData {
	name: string;
	short_name: string;
	chain: string;
	network: string;
	chain_id: number;
	network_id: number;
	rpc_url: string;
	native_currency: IAssetData;
}

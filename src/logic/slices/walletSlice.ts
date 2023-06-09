import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../shared/types";

// Declaire Initial State
const initialState: StateType = {
	provider: null,
	web3Provider: null,
	address: undefined,
	chainId: undefined,
	blockNumber: undefined,
	balance: undefined,
};

// Created Slice
const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setProvider: (state: StateType, { payload }: { payload: any }) => {
			state.provider = payload;
		},
		setWeb3Provider: (state: StateType, { payload }: { payload: any }) => {
			state.web3Provider = payload;
		},
		setUserAddress: (
			state: StateType,
			{ payload }: { payload: string | undefined }
		) => {
			state.address = payload;
		},
		setChainId: (
			state: StateType,
			{ payload }: { payload: number | undefined }
		) => {
			state.chainId = payload;
		},
		setWalletBalance: (
			state: StateType,
			{ payload }: { payload: string | undefined }
		) => {
			state.balance = payload;
		},
		setBlockNumber: (
			state: StateType,
			{ payload }: { payload: number | undefined }
		) => {
			state.blockNumber = payload;
		},
	},
});

// Export Reducer
export const {
	setProvider,
	setWeb3Provider,
	setUserAddress,
	setChainId,
	setWalletBalance,
	setBlockNumber,
} = walletSlice.actions;

export default walletSlice.reducer;

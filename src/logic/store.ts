import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./slices/walletSlice";

// Created Redux Store
const store = configureStore({
	reducer: {
		/* The name of the reducer. */
		wallet: walletSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	// devTools: process.env.NODE_ENV !== "production",
});

//Export Redux Store
export default store;

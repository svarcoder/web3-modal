import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../logic/hooks/useAppDispatch";
import { useAppSelector } from "../logic/hooks/useAppSelector";
import {
	activateInjectedProvider,
	getChainData,
	web3Modal,
} from "../shared/utilities";
import {
	setChainId,
	setProvider,
	setUserAddress,
	setWeb3Provider,
} from "../logic/slices/walletSlice";
import { providers } from "ethers";

const Main = () => {
	const walletDetails = useAppSelector((state: any) => state.wallet);
	const dispatch = useAppDispatch();
	const chainData = getChainData(walletDetails?.chainId);
	activateInjectedProvider("MetaMask");

	const connect = useCallback(async () => {
		try {
			const provider = await web3Modal()?.connect();
			const web3Provider = new providers.Web3Provider(provider);

			const signer = web3Provider.getSigner();
			const address = await signer.getAddress();
			const network = await web3Provider.getNetwork();
			dispatch(setProvider(provider));
			dispatch(setWeb3Provider(web3Provider));
			dispatch(setUserAddress(address));
			dispatch(setChainId(network.chainId));
		} catch (error) {
			console.log("error", error);
		}
	}, []);

	const disconnect = useCallback(async () => {
		try {
			await web3Modal()?.clearCachedProvider();
			if (
				walletDetails?.provider?.disconnect &&
				typeof walletDetails?.provider?.disconnect === "function"
			) {
				await walletDetails?.provider?.disconnect();
			}
			dispatch(setProvider(null));
			dispatch(setWeb3Provider(null));
			dispatch(setUserAddress(undefined));
			dispatch(setChainId(undefined));
		} catch (error) {
			console.log("error", error);
		}
	}, [walletDetails?.provider]);

	useEffect(() => {
		if (web3Modal()?.cachedProvider) {
			connect();
		}
	}, [connect]);

	useEffect(() => {
		const handleAccountsChanged = (accounts: string[]) => {
			dispatch(setUserAddress(accounts[0]));
		};

		const handleChainChanged = (_hexChainId: string) => {
			window.location.reload();
		};

		const handleDisconnect = (error: { code: number; message: string }) => {
			console.log("disconnect", error);
			disconnect();
		};

		if (walletDetails?.provider?.on) {
			walletDetails?.provider.on("accountsChanged", handleAccountsChanged);
			walletDetails?.provider.on("chainChanged", handleChainChanged);
			walletDetails?.provider.on("disconnect", handleDisconnect);

			return () => {
				if (walletDetails?.provider.removeListener) {
					walletDetails?.provider.removeListener(
						"accountsChanged",
						handleAccountsChanged
					);
					walletDetails?.provider.removeListener(
						"chainChanged",
						handleChainChanged
					);
					walletDetails?.provider.removeListener(
						"disconnect",
						handleDisconnect
					);
				}
			};
		}
	}, [walletDetails?.provider, disconnect]);

	return (
		<div className='wrapper'>
			<div className='card-header text-center'>Web3 Modal</div>
			{walletDetails?.address && (
				<div className='card'>
					<div className='card-body'>
						<div className='text-break'>
							ChainId: {chainData ? chainData?.name : "-----"}
						</div>

						<div className='text-break'>
							Account:{" "}
							{walletDetails?.address ? walletDetails?.address : "-----"}
						</div>
					</div>
				</div>
			)}
			<div className='text-center m-4'>
				{walletDetails?.web3Provider ? (
					<button className='btn btn-outline-danger' onClick={disconnect}>
						Disconnect
					</button>
				) : (
					<button className='btn btn-outline-primary' onClick={connect}>
						Connect
					</button>
				)}
			</div>
		</div>
	);
};

export default Main;

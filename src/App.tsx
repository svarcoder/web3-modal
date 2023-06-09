import Main from "./module/Main";
import "./App.css";
import { Provider } from "react-redux";
import store from "./logic/store";

function App() {
	return (
		<>
			<Provider store={store}>
				<Main />
			</Provider>
		</>
	);
}

export default App;

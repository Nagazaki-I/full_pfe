import React from "react";
import App from "./src/App.jsx";

import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { app } from "./src/firebase.config";

//  PersistGate is a componenent that delays the rendering of your application's UI until the persisted state has been retrieved and rehydrated.


const Index = () => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</React.StrictMode>
	);
};

export default Index;

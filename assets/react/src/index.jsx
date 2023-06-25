import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';

import {app} from "./firebase.config"


//  PersistGate is a componenent that delays the rendering of your application's UI until the persisted state has been retrieved and rehydrated.



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

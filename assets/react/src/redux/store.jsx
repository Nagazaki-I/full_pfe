import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'cartItems', // The key for storing the state in storage
  storage, // The storage type (e.g., localStorage, sessionStorage) [Leaving it at `storage` uses `localStorage` by default]
  // other configuration options if needed
};

// This returns a new reducer that wraps the existing root reducer (cartReducer) 
//      and adds the necessary logic to persist and rehydrate the state.

//In the context of state persistence with redux-persist, "rehydration" refers to the process of restoring the persisted state from storage 
//   and populating the Redux store with that state when the application is loaded or reloaded.
const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Here we set the ignored actions in the middleware to avoid errors when the browser loads of saves the state.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// The persistor object is responsible for persisting and rehydrating the state from storage.
export const persistor = persistStore(store)


// export const store = configureStore({
//   reducer: {
//     cart: cartReducer
//   }
// })



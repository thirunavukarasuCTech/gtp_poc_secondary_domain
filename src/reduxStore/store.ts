import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./rootReducers/rootReducer";
import { persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: {
        userState: persistedReducer,
    }
})

export const persistor = persistStore(store);
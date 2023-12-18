import { combineReducers } from "@reduxjs/toolkit";
import LoginAndSignUpSliceReducer from "../features/LoginAndSignUpSlice/LoginAndSignUpSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CardNumberRegistrationReducer from "../features/CardNumberRegistrationSlice/CardNumberRegistrationSlice";
import UserDataFromCapillarySliceReducer from "../features/CapillaryUserInfoSlice/CapillaryUserInfoSlice";

export const rootReducer = combineReducers({
    loginAndSignup: LoginAndSignUpSliceReducer,
    cardNumberRegistration : CardNumberRegistrationReducer,
    userDataFromCapillary: UserDataFromCapillarySliceReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginAndSignup']
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);


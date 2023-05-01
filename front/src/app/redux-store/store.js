import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authenticationReducer from './authenticationSlice';
import basketReducer from './basketSlice';
import {persistReducer, persistStore} from "redux-persist";



const rootReducer = combineReducers( {
    auth: authenticationReducer,
    basket: basketReducer
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

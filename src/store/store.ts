import loginSlice from 'src/features/login/loginSlice';
import transactionSlice from 'src/features/transactions/transactionSlice';

import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        transactionStore: transactionSlice,
        loginStore: loginSlice,
        authStore: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

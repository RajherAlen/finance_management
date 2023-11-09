import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";
import transactionSlice from "src/features/transactions/transactionSlice";

export const store = configureStore({
	reducer: {
		transactionStore: transactionSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({ serializableCheck: false }).concat(
			apiSlice.middleware
		);
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

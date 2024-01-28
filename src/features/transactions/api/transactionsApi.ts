import { apiSlice } from "src/store/apiSlice";

const backendURL = "http://localhost:3000";

export const transactionApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addTransaction: builder.mutation({
			query: (data) => ({
				url: `${backendURL}/api/transaction`,
				method: "POST",
				body: data
			})
		}),
	})
});

export const { useAddTransactionMutation } = transactionApiSlice;

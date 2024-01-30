import { apiSlice } from 'src/store/apiSlice';

export const transactionApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['transactionList'] }).injectEndpoints({
    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        addTransaction: builder.mutation({
            query: (data) => ({
                url: `/transaction`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['transactionList'],
        }),
        deleteTransaction: builder.mutation({
            query: ({ userId, transactionId }) => ({
                url: `/transaction/${userId}`,
                method: 'DELETE',
                body: {
                    transactionId,
                },
            }),
            invalidatesTags: ['transactionList'],
        }),
    }),
    overrideExisting: true,
});

export const { useAddTransactionMutation, useGetTransactionQuery, useDeleteTransactionMutation } = transactionApiSlice;

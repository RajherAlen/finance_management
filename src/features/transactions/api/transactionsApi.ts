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
        getLastWeekTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/last-week/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getThisWeekTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/this-week/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getThisMonthTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/this-month/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getLastMonthTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/last-month/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getLastThreeMonthTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/last-three-month/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getLastSixMonthTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/last-six-month/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getThisYear: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/this-year/${userId}`,
                method: 'GET',
            }),
            providesTags: ['transactionList'],
        }),
        getLastMonthRecurringTransactions: builder.query({
            query: (userId: string | number) => ({
                url: `/transaction/last-month-recurring/${userId}`,
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
        updateIncome: builder.mutation({
            query: ({ userId, income }) => ({
                url: '/income',
                method: 'PATCH',
                body: {
                    userId,
                    income,
                },
            }),
            invalidatesTags: ['transactionList'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useAddTransactionMutation,
    useGetTransactionQuery,
    useGetLastWeekTransactionsQuery,
    useGetThisWeekTransactionsQuery,
    useGetThisMonthTransactionsQuery,
    useGetLastMonthTransactionsQuery,
    useGetLastThreeMonthTransactionsQuery,
    useGetLastSixMonthTransactionsQuery,
    useGetLastMonthRecurringTransactionsQuery,
    useGetThisYearQuery,
    useDeleteTransactionMutation,
    useUpdateIncomeMutation,
} = transactionApiSlice;

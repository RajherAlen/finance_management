import { apiSlice } from 'src/store/apiSlice';

export const loansApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['loansList'] }).injectEndpoints({
    endpoints: (builder) => ({
        getLoans: builder.query({
            query: (userId: string | number) => ({
                url: `/loan/${userId}`,
                method: 'GET',
            }),
            providesTags: ['loansList'],
        }),
        addLoan: builder.mutation({
            query: (data) => ({
                url: `/loan`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['loansList'],
        }),
    }),
});

export const { useAddLoanMutation, useGetLoansQuery } = loansApiSlice;

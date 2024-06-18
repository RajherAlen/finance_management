import { apiSlice } from 'src/store/apiSlice';

export const loansApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['loansList'] }).injectEndpoints({
    endpoints: (builder) => ({
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

export const { useAddLoanMutation } = loansApiSlice;

import { apiSlice } from 'src/store/apiSlice';

export const savingsApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['savingList'] }).injectEndpoints({
    endpoints: (builder) => ({
        getSavings: builder.query({
            query: (userId: string | number) => ({
                url: `/saving/${userId}`,
                method: 'GET',
            }),
            providesTags: ['savingList'],
        }),
        addSaving: builder.mutation({
            query: (data) => ({
                url: `/saving`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['savingList'],
        }),
        updateSaving: builder.mutation({
            query: (data) => ({
                url: '/saving',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['savingList'],
        }),
    }),
});

export const { useAddSavingMutation, useGetSavingsQuery, useUpdateSavingMutation } = savingsApiSlice;

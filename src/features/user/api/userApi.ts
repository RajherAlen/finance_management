import { apiSlice } from 'src/store/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useUserInfoQuery } = userApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).authStore.userToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');

        return headers;
    },
});
export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({}),
});

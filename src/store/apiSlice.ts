import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5000',
    prepareHeaders(headers) {
        headers.set('Content-Type', 'application/json');

        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
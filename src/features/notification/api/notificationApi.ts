import { apiSlice } from 'src/store/apiSlice';

export const notificationApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['notificationList'] }).injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (userId: string | number) => ({
                url: `/notification/${userId}`,
                method: 'GET',
            }),
            providesTags: ['notificationList'],
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApiSlice;

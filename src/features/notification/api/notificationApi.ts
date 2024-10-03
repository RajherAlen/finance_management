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
        sendNotification: builder.mutation({
            query: (data) => ({
                url: '/notification',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['notificationList'],
        }),
    }),
});

export const { useGetNotificationsQuery, useSendNotificationMutation } = notificationApiSlice;

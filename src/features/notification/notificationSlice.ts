import { createSlice } from '@reduxjs/toolkit';

import { NotificationProps } from './model/notificationModel';

interface NotificationState {
    notifications: NotificationProps[];
    unReadMessages: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    unReadMessages: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            const existingNotification = state.notifications.find(
                (notification) => notification.description === action.payload.description
            );
            if (!existingNotification) {
                state.notifications = [...state.notifications, action.payload];
            }
        },
        checkUnreadNotifications: (state) => {
            const hasUnreadNotifications = state.notifications.some((notification) => !notification.isRead);

            if (hasUnreadNotifications) state.unReadMessages = true;
        },
        resetNotifications: (state) => {
            state.notifications = [];
            state.unReadMessages = false;
        },
    },
});

export const { setNotifications, checkUnreadNotifications, resetNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;

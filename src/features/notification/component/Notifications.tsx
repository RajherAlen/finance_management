import React, { useEffect } from 'react';

import { Dropdown } from 'src/components/dropdown';
import Separator from 'src/components/separator/Separator';

import { BellIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useGetNotificationsQuery } from '../api/notificationApi';
import { NotificationProps } from '../model/notificationModel';
import { setNotifications } from '../notificationSlice';

const Notifications = () => {
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { notifications } = useAppSelector((state) => state.notificationStore);

    const { data: notificationsData } = useGetNotificationsQuery(userInfo?.id);

    if (notificationsData) {
        notificationsData.notifications.map((notification: NotificationProps) => {
            dispatch(setNotifications(notification));
        });
    }

    return (
        <Dropdown allign='end' trigger={<BellIcon width={18} />}>
            <div className='flex flex-col gap-2'>
                {notifications.length > 0 ? (
                    notifications?.map((notification: NotificationProps, index: number) => {
                        if (!notification) return null;

                        return (
                            <React.Fragment key={Math.random()}>
                                <div className='flex items-start justify-between gap-2'>
                                    <div className=''>
                                        <p className='text-xs font-semibold'>{notification.title}</p>
                                        <p className='text-xs'>{notification.description}</p>
                                    </div>
                                </div>

                                {notifications.length - 1 !== index && <Separator className='my-2' />}
                            </React.Fragment>
                        );
                    })
                ) : (
                    <p className='text-xs'>No notifications</p>
                )}
            </div>
        </Dropdown>
    );
};

export default Notifications;

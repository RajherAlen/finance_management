import React from 'react';

import Button from 'src/components/button/Button';
import { Dropdown } from 'src/components/dropdown';
import Separator from 'src/components/separator/Separator';

import { BellIcon, CheckCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useGetNotificationsQuery, useMarkAsReadMutation } from '../api/notificationApi';
import { NotificationProps } from '../model/notificationModel';
import { setNotifications } from '../notificationSlice';

const Notifications = () => {
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { notifications } = useAppSelector((state) => state.notificationStore);
    const [markAsRead] = useMarkAsReadMutation();
    const { data: notificationsData } = useGetNotificationsQuery(userInfo?.id);

    const filteredData =
        notificationsData && notificationsData.notifications.filter((notification: NotificationProps) => !notification.isRead);

    if (filteredData?.length > 0) {
        filteredData.map((notification: NotificationProps) => {
            if (!notification.isRead) {
                dispatch(setNotifications(notification));
            }
        });
    }

    const handleMarkAsRead = async (id: number | undefined) => {
        await markAsRead({
            userId: userInfo?.id,
            id,
        });
    };

    return (
        <Dropdown
            allign='end'
            contentClassName='transition-all duration-200'
            trigger={
                filteredData && filteredData.length > 0 ? (
                    <div className='relative'>
                        <div className='absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500'></div>
                        <BellIcon width={18} />
                    </div>
                ) : (
                    <BellIcon width={18} />
                )
            }
        >
            <div className='flex flex-col gap-2'>
                {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((notification: NotificationProps, index: number) => {
                        if (!notification || notification.isRead) return null;

                        return (
                            <React.Fragment key={Math.random()}>
                                <div className='group flex items-center justify-between gap-2 overflow-hidden'>
                                    <div className=''>
                                        <p className='text-xs font-semibold'>{notification.title}</p>
                                        <p className='line-clamp-2 max-w-[220px] text-xs'>{notification.description}</p>
                                    </div>

                                    <Button
                                        variant='outline'
                                        size='sm'
                                        disabled={notification.isRead}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        title='Mark as read'
                                    >
                                        <CheckCheck />
                                    </Button>
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

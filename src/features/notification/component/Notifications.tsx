import React from 'react';

import { Dropdown } from 'src/components/dropdown';
import Separator from 'src/components/separator/Separator';

import { BellIcon } from 'lucide-react';
import { useAppSelector } from 'src/store/hooks';

import { useGetNotificationsQuery } from '../api/notificationApi';
import { NotificationProps } from '../model/notificationModel';

const Notifications = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);

    // get user notifications
    const { data: notificationData } = useGetNotificationsQuery(userInfo?.id);

    return (
        <Dropdown allign='end' trigger={<BellIcon width={18} />}>
            <div className='flex flex-col gap-2'>
                {notificationData?.notifications?.map((notification: NotificationProps, index: number) => (
                    <>
                        <div key={notification.id} className='flex items-start justify-between gap-2'>
                            <div className=''>
                                <p className='text-xs font-semibold'>{notification.title}</p>
                                <p className='text-xs'>{notification.description}</p>
                            </div>
                        </div>

                        {notificationData.length - 1 !== index && <Separator className='my-2' />}
                    </>
                ))}
            </div>
        </Dropdown>
    );
};

export default Notifications;

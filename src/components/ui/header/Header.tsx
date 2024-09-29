'use client';

import React from 'react';

import { Avatar } from 'src/components/avatar/Avatar';
import Button from 'src/components/button/Button';
import { Dropdown, DropdownItem } from 'src/components/dropdown';
import Separator from 'src/components/separator/Separator';

import { BellIcon, Check, CheckCheck, CheckCheckIcon, CheckCircle, LogOutIcon, UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { logout } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const dispatch = useAppDispatch();

    const pathName = usePathname();
    const router = useRouter();

    const handleLogOut = () => {
        dispatch(logout());
        router.push('/login');
    };

    const handleRouteTo = (route: string) => {
        router.push(`/${route}`);
    };

    const notifications = [
        {
            id: 1,
            title: 'Notification Title 1',
            message: 'Notification 1',
        },
        {
            id: 2,
            title: 'Notification Title 2',
            message: 'Notification 2',
        },
    ];

    return (
        <div className='flex items-center justify-between gap-3 px-4 py-3'>
            <div className='flex-1'>
                <p className='text-xl capitalize'>{pathName.replace('/', '').replace('-', ' ')}</p>
            </div>

            <div className='flex items-center justify-end gap-3'>
                <Dropdown allign='end' trigger={<BellIcon width={18} />}>
                    <div className='flex flex-col gap-2'>
                        {notifications.map((notification, index) => (
                            <>
                                <div key={notification.id} className='flex items-start justify-between gap-2'>
                                    <div className=''>
                                        <p className='text-xs font-semibold'>{notification.title}</p>
                                        <p className='text-xs'>{notification.message}</p>
                                    </div>
                                </div>
                                
                                {notifications.length - 1 !== index && <Separator className='my-2' />}
                            </>
                        ))}
                    </div>
                </Dropdown>

                <Dropdown
                    trigger={
                        <div className='flex items-center gap-2 text-left'>
                            <Avatar />
                            <div>
                                <p className='text-sm font-bold text-slate-600'>{userInfo?.fullName}</p>
                                <p className='text-xs text-muted'>{userInfo?.email}</p>
                            </div>
                        </div>
                    }
                    size='reset'
                    variant='ghost'
                >
                    <DropdownItem onClick={() => handleRouteTo('user-info')}>
                        <UserIcon width={14} />
                        User Info
                    </DropdownItem>

                    <div className='my-1 border-t border-slate-200 border-opacity-60'></div>

                    <DropdownItem onClick={handleLogOut}>
                        <LogOutIcon width={14} />
                        Logout
                    </DropdownItem>
                </Dropdown>
            </div>

            <div className='mt-3 border-t'></div>
        </div>
    );
};

export default Header;

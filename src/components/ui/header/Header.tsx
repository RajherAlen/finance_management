'use client';

import React from 'react';

import { Avatar } from 'src/components/avatar/Avatar';
import { Dropdown, DropdownItem } from 'src/components/dropdown';

import { LogOutIcon, UserIcon } from 'lucide-react';
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

    return (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex-1">
                <p className="text-xl capitalize">{pathName.replace('/', '')}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Dropdown
                    trigger={
                        <div className="flex items-center text-left gap-2">
                            <Avatar />
                            <div>
                                <p className="text-sm font-bold text-slate-600">{userInfo?.fullName}</p>
                                <p className="text-xs text-muted">{userInfo?.email}</p>
                            </div>
                        </div>
                    }
                    size="reset"
                    variant="ghost"
                >
                    <DropdownItem>
                        <UserIcon width={14} />
                        User Info
                    </DropdownItem>

                    <div className="my-1 border-t border-slate-200 border-opacity-60"></div>

                    <DropdownItem onClick={handleLogOut}>
                        <LogOutIcon width={14} />
                        Logout
                    </DropdownItem>
                </Dropdown>
            </div>

            <div className="mt-3 border-t"></div>
        </div>
    );
};

export default Header;

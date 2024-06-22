'use client';

import React from 'react';

import { Avatar } from 'src/components/avatar/Avatar';

import { usePathname } from 'next/navigation';
import { useAppSelector } from 'src/store/hooks';
import { Dropdown, DropdownItem } from 'src/components/dropdown';
import { LogOutIcon, UserIcon } from 'lucide-react';

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);

    const pathName = usePathname();

    console.log(userInfo)

    return (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex-1">
                <p className="text-xl capitalize">{pathName.replace('/', '')}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Dropdown trigger={<Avatar />} size="reset" variant="ghost">
                    <DropdownItem>
                        <LogOutIcon width={14} />
                        Logout
                    </DropdownItem>
                    <DropdownItem>
                        <UserIcon width={14} />
                        User Info
                    </DropdownItem>
                </Dropdown>

                <div>
                    <p className="text-sm font-bold text-slate-600">{userInfo?.fullName}</p>
                    <p className="text-xs text-muted">{userInfo?.email}</p>
                </div>
            </div>

            <div className="mt-3 border-t"></div>
        </div>
    );
};

export default Header;

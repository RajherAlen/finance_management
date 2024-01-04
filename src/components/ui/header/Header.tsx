'use client';

import React from 'react';

import { Avatar } from 'src/components/avatar/Avatar';
import Title from 'src/components/text/Title';

import { usePathname } from 'next/navigation';

const Header = () => {
    const pathName = usePathname();

    return (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex-1">
                <p className="text-xl capitalize">{pathName.replace('/', '')}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Avatar />
                <div>
                    <p className="text-sm font-bold text-slate-600">Alen Rajher</p>
                    <p className="text-xs text-muted">arajher@mono.software</p>
                </div>
            </div>

            <div className="mt-3 border-t"></div>
        </div>
    );
};

export default Header;

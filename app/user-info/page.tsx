'use client';

import React from 'react';

import Separator from 'src/components/separator/Separator';

import { useAppSelector } from 'src/store/hooks';

const UserInfo = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    console.log(userInfo);

    return (
        <div className="max-w-lg rounded-lg bg-white p-6">
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-xs text-gray-500">Name:</p>
                    <p className="text-sm font-medium">{userInfo?.fullName}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Email:</p>
                    <p className="text-sm font-medium">{userInfo?.email}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Role:</p>
                    <p className="text-sm font-medium">{userInfo?.jobRole}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;

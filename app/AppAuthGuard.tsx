import React, { useEffect, useState } from 'react';

import GlobalLoader from 'src/components/loader/GlobalLoader';

import { useRouter } from 'next/navigation';
import { useAppSelector } from 'src/store/hooks';

const AppAuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const authStore = useAppSelector((state) => state.authStore);

    useEffect(() => {
        if (!authStore.userInfo && !authStore.userToken) {
            return router.push('/login');
        }

        setIsLoading(false);
    }, [authStore.userInfo, authStore.userToken, router]);

    if (isLoading) return <GlobalLoader />;

    return <>{children}</>;
};

export default AppAuthGuard;

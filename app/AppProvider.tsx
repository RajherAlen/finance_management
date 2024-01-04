'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';

import { Header, Menu } from 'src/components/ui';

import { usePathname } from 'next/navigation';
import { store } from 'src/store/store';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isLoginPage = pathname.includes('login');

    return (
        <Provider store={store}>
            {isLoginPage ? (
                <div className="h-screen w-full overflow-auto p-12">{children}</div>
            ) : (
                <React.Fragment>
                    <Menu />

                    <div className="w-full py-6">
                        <Header />
                        <div className="h-screen w-full overflow-auto p-4">{children}</div>
                    </div>
                </React.Fragment>
            )}

            <ToastContainer theme="colored" hideProgressBar autoClose={1500} transition={Zoom} draggable />
        </Provider>
    );
};

export default AppProvider;

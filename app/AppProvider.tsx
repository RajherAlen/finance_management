'use client'
import React from 'react'
import { store } from 'src/store/store'
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';
import { Header, Menu } from 'src/components/ui';

const AppProvider = ({ children }: { children: React.ReactNode }) =>
{
    return (
        <Provider store={store}>
            <Menu />

            <div className='w-full'>
                <Header />
                <div className='w-full h-screen p-4 overflow-auto bg-indigo-50 bg-opacity-50'>
                    {children}
                </div>
            </div>

            <ToastContainer
                theme="colored"
                hideProgressBar
                autoClose={1500}
                transition={Zoom}
                draggable
            />
        </Provider>
    )
}

export default AppProvider
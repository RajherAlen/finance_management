'use client';

import React from 'react';

import Button, { buttonVariants } from 'src/components/button/Button';
import GobletIcon from 'src/components/icons/goblet.svg';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { login as loginAction } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useLoginMutation } from '../../api/loginApi';
import { resetCurrentStep } from '../../loginSlice';

const OnboardingSuccess = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const loginStore = useAppSelector((state) => state.loginStore);

    const [login, { isLoading }] = useLoginMutation();

    const handleFinishLogin = async () => {
        const loginData: any = await login({ email: loginStore?.email, password: loginStore?.password });

        if (loginData.data.isLoggedIn) {
            dispatch(loginAction(loginData));

            dispatch(resetCurrentStep());

            router.push('/');
        }
    };
    return (
        <div className="flex flex-col items-center">
            <Image src={GobletIcon} width={200} height={200} alt="Picture of the author" />
            <p className="mb-3 text-3xl font-bold">You are all set!</p>
            <p className="mb-5 text-sm text-muted">We have taken your data and personalized financial dashboard for you.</p>

            <Button onClick={handleFinishLogin} className={buttonVariants({ size: 'lg' })} isLoading={isLoading}>
                Go to Dashboard
            </Button>
        </div>
    );
};

export default OnboardingSuccess;

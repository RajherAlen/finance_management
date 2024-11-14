'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';
import TransactionIcons from 'src/features/transactions/components/TransactionIcons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import validationToast from 'src/lib/utils/validationToast';
import { login as loginAction } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { useLoginMutation } from '../api/loginApi';
import { nextStep, setLoginInfo } from '../loginSlice';
import { loginSchema } from '../model/loginSchema';

const LoginForm = () => {
    const loginStore = useAppSelector((state) => state.loginStore);

    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: loginStore.email,
            password: loginStore.password,
        },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const loginData: any = await login(data);

        if (!loginData.data?.isLoggedIn && loginData.data?.success) {
            dispatch(setLoginInfo(data));
            dispatch(nextStep());
        } else if (loginData.data?.isLoggedIn) {
            dispatch(loginAction(loginData));
            router.push('/');
        } else {
            validationToast({
                status: 'error',
                message: loginData.data?.data,
            });
        }
    };

    return (
        <>
            <TransactionIcons type="login" width={48} height={48} />
            <h1 className="mb-3 mt-5 text-3xl font-bold">Login</h1>

            <p className="mb-8 text-sm font-normal text-muted">Enter your credentials to sign in to application</p>

            <div className="w-full max-w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormCustomInput
                                    requiered
                                    placeholder="Enter email address"
                                    label="Enter email"
                                    className="w-full"
                                    type="email"
                                    field={field}
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormCustomInput
                                    requiered
                                    label="Enter Password"
                                    placeholder="Enter Password"
                                    className="w-full"
                                    field={field}
                                    type="password"
                                />
                            )}
                        />

                        <Button type="submit" size="lg" className="mt-5 w-full">
                            Sign In
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default LoginForm;

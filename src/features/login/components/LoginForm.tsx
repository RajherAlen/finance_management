'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';
import TransactionIcons from 'src/features/transactions/components/TransactionIcons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { nextStep, setLoginInfo } from '../loginSlice';
import { loginSchema } from '../model/loginSchema';

const LoginForm = () => {
    const loginStore = useAppSelector((state) => state.loginStore);
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: loginStore.email,
            password: loginStore.password,
        },
    });

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        dispatch(setLoginInfo(data));
        // TODO
        // IF user exist just redirect to dashboard
        dispatch(nextStep());
    };

    return (
        <>
            <TransactionIcons type="login" width={48} height={48} />
            <h1 className="mb-3 mt-5 text-3xl font-bold">Login</h1>

            <p className="mb-8 text-sm font-normal text-muted">Enter your credensialts to sign in to application</p>

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

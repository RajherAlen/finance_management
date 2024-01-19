'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';
import TransactionIcons from 'src/features/transactions/components/TransactionIcons';

import { zodResolver } from '@hookform/resolvers/zod';
import { PrismaClient } from '@prisma/client';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { nextStep, setLoginInfo } from '../loginSlice';
import { loginSchema } from '../model/loginSchema';

const prisma = new PrismaClient();

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

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (user) {
            // User exists, redirect to dashboard or perform any other actions
            console.log('USER EXISTS');
        } else {
            // User does not exist, handle accordingly (e.g., show error message)
            const newUser = await prisma.user.create({
                data: {
                    email: 'example@example.com',
                    password: 'hashed_password', // You should hash the password before inserting
                    fullName: 'John Doe',
                    username: 'johndoe',
                    jobRole: 'Software Developer',
                },
            });
            console.log(newUser)
            // dispatch(setLoginInfo(data));
            // dispatch(nextStep());
        }
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

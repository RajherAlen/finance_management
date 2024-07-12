'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { setAccountInfo } from '../../loginSlice';
import { accountInfoSchema } from '../../model/accountInfoSchema';
import OnboardingLayout from './OnboardingLayout';

const OnboardingStep1 = () => {
    const loginStore = useAppSelector((state) => state.loginStore);
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof accountInfoSchema>>({
        resolver: zodResolver(accountInfoSchema),
        defaultValues: {
            fullName: loginStore.fullName,
            username: loginStore.username,
            jobRole: loginStore.jobRole,
        },
    });

    const onSubmit = (data: z.infer<typeof accountInfoSchema>) => {
        dispatch(setAccountInfo(data));
    };

    return (
        <OnboardingLayout actionToContinue={form.handleSubmit(onSubmit)} formIsValid={form.formState.isValid}>
            <p className="mb-8 text-3xl font-bold">Setup your account</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[610px] space-y-5">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter your full name"
                                placeholder="Enter your full name"
                                className="w-full"
                                field={field}
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter your username"
                                placeholder="Enter your username"
                                className="w-full"
                                field={field}
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="jobRole"
                        render={({ field }) => (
                            <FormCustomInput
                                placeholder="Enter your job role"
                                label="Enter your job role"
                                className="w-full"
                                field={field}
                            />
                        )}
                    />
                </form>
            </Form>
        </OnboardingLayout>
    );
};

export default OnboardingStep1;

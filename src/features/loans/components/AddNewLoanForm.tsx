'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import FormCustomInput from 'src/components/form/FormCustomInput';
import FormDatePicker from 'src/components/form/FormDatePicker';
import { Form, FormField, FormLabel } from 'src/components/form/form';
import Separator from 'src/components/separator/Separator';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { useAddLoanMutation } from '../api/loansApi';
import { loanSchema } from '../model/loanSchema';

const AddNewLoanForm = ({ additionalAction }: { additionalAction?: () => void }) => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const [addLoan] = useAddLoanMutation();

    const defaultValues = {
        name: '',
        totalAmount: 0,
        paid: 0,
        startDate: new Date(),
        endDate: new Date(),
        totalInstalments: 0,
        interestRate: 0,
    };

    const form = useForm<z.infer<typeof loanSchema>>({
        resolver: zodResolver(loanSchema),
        defaultValues,
    });

    const onSubmit = (data: z.infer<typeof loanSchema>) => {
        addLoan({
            name: data.name,
            totalAmount: data.totalAmount,
            paid: data.paid,
            startDate: data.startDate,
            endDate: data.endDate,
            totalInstalments: data.totalInstalments,
            currentInstalment: data.currentInstalment,
            instalmentAmount: data.instalmentAmount,
            interestRate: data.interestRate,
            userId: userInfo.id,
        });

        if (additionalAction !== undefined) {
            additionalAction();
        }

        form.reset(defaultValues);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormCustomInput label="Enter loan name" placeholder="Enter loan name" className="w-full" field={field} />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalAmount"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter total loan amount"
                                placeholder="Enter total loan amount"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paid"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter paid amount"
                                placeholder="Enter paid amount"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                    <div className="grid grid-cols-2">
                        <div>
                            <FormLabel>Start date</FormLabel>
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => <FormDatePicker disableAfter field={field} />}
                            />
                        </div>
                        <div>
                            <FormLabel>End date</FormLabel>
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => <FormDatePicker disableBefore field={field} />}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="totalInstalments"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter total instalments"
                                placeholder="Enter total instalments"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentInstalment"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter current instalment"
                                placeholder="Enter current instalment"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instalmentAmount"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter instalment amount"
                                placeholder="Enter instalment amount"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="interestRate"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter interest rate"
                                placeholder="Enter interest rate"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />
                </div>

                <Separator />

                <div className="flex justify-end">
                    <Button variant="outline" className="flex items-center gap-2">
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddNewLoanForm;

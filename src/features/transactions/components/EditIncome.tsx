'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as z from 'zod';

import { useUpdateIncomeMutation } from '../api/transactionsApi';
import { incomeSchema } from '../model/incomeSchema';
import { setTotalIncome } from '../transactionSlice';

const EditIncome = ({ additionalAction }: { additionalAction: () => void }) => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.authStore);
    const [updateIncome] = useUpdateIncomeMutation();

    const form = useForm<z.infer<typeof incomeSchema>>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof incomeSchema>) => {
        dispatch(setTotalIncome(values.amount));
        updateIncome({ userId: userInfo?.id, income: values.amount });

        if (additionalAction !== undefined) {
            additionalAction();
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormCustomInput requiered className="mb-2 flex-1" label="Amount" field={field} type="number" />
                        )}
                    />
                    <div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <PlusCircleIcon width={16} height={16} stroke="#1B2327" />
                            Add
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default EditIncome;

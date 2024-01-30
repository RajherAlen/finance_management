'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import FormCustomInput from 'src/components/form/FormCustomInput';
import FormDatePicker from 'src/components/form/FormDatePicker';
import FormError from 'src/components/form/FormError';
import { Form, FormField } from 'src/components/form/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { useAddTransactionMutation } from '../api/transactionsApi';
import { expenseSchema } from '../model/expenseSchema';
import { updateTotalExpense } from '../transactionSlice';

const AddExpense = ({ required = true, customTitle }: { required?: boolean; customTitle?: string }) => {
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState<'needs' | 'wants'>('needs');
    const [addTransaction] = useAddTransactionMutation();
    const { userInfo } = useAppSelector((state) => state.authStore);

    const form = useForm<z.infer<typeof expenseSchema>>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            amount: 0,
            description: '',
            date: undefined,
        },
    });

    const { amount, description } = form.formState.errors;

    const onSubmit = (data: z.infer<typeof expenseSchema>) => {
        addTransaction({
            ...data,
            category: category,
            type: 'expense',
            userId: userInfo.id,
        });

        form.reset({
            amount: 0,
            description: '',
            date: undefined,
        });
    };

    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <p className="text-xl font-semibold">{customTitle ? customTitle : 'Add your recurring expenses'}</p>
                <Card variant="outline" size="sml" radius="md">
                    <div className="flex gap-1">
                        <Button size="sm" variant={category === 'needs' ? 'secondary' : 'ghost'} onClick={() => setCategory('needs')}>
                            Essentials
                        </Button>
                        <Button size="sm" variant={category === 'wants' ? 'secondary' : 'ghost'} onClick={() => setCategory('wants')}>
                            Non-Essentials
                        </Button>
                    </div>
                </Card>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-start gap-2">
                            <Card variant="outline" className="flex flex-1 gap-4">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormCustomInput
                                            requiered={required}
                                            field={field}
                                            inputClassName="h-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            type="number"
                                            hideErrorMessage
                                        />
                                    )}
                                />
                                <div className="border-1 border-l"></div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormCustomInput
                                            requiered={required}
                                            field={field}
                                            placeholder="Enter expense type"
                                            inputClassName="h-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            type="text"
                                            hideErrorMessage
                                        />
                                    )}
                                />
                            </Card>

                            <FormField control={form.control} name="date" render={({ field }) => <FormDatePicker field={field} />} />
                        </div>
                    </div>

                    <Button variant="outline" className="flex items-center gap-2">
                        <PlusCircleIcon width={16} height={16} stroke="#1B2327" />
                        Add
                    </Button>

                    {amount || description ? (
                        <Card variant="outline-error">
                            {amount && <FormError message={amount.message} />}
                            {description && <FormError message={description.message} />}
                        </Card>
                    ) : null}
                </form>
            </Form>
        </div>
    );
};

export default AddExpense;

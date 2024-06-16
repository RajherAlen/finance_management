import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import FormCustomInput from 'src/components/form/FormCustomInput';
import FormSelect from 'src/components/form/FormSelect';
import { Form, FormField } from 'src/components/form/form';

import { addToSavingSchema } from 'src/features/transactions/model/savingSchema';
import { Saving } from 'src/features/transactions/model/transactionModel';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useUpdateSavingMutation } from '../api/savingsApi';
import { useAddTransactionMutation } from 'src/features/transactions/api/transactionsApi';
import { useAppSelector } from 'src/store/hooks';

const AddToSavingForm = ({ savings }: { savings: Saving[] }) => {
    const [updateSaving] = useUpdateSavingMutation();
    const [addTransaction] = useAddTransactionMutation();
    const { userInfo } = useAppSelector((state) => state.authStore);

    const defaultValues = {
        savingName: '',
        amount: 0,
    };

    const form = useForm<z.infer<typeof addToSavingSchema>>({
        resolver: zodResolver(addToSavingSchema),
        defaultValues,
    });

    const onSubmit = (data: z.infer<typeof addToSavingSchema>) => {
        const selectedSaving = savings.filter((saving) => saving.name === data.savingName);

        updateSaving({ ...selectedSaving[0], currentlySaved: selectedSaving[0].currentlySaved + data.amount });
        
        addTransaction({
            amount: data.amount,
            description: selectedSaving[0].name,
            category: 'savings',
            type: 'expense',
            userId: userInfo.id,
            date: new Date()
        })

        form.reset(defaultValues);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
                <p className="mb-4 text-sm font-semibold text-gray-700">Add to savings</p>
                <Card className="flex-1 space-y-5">
                    <FormField
                        control={form.control}
                        name="savingName"
                        render={({ field }) => (
                            <FormSelect
                                label="Select saving you want to add money"
                                placeholder="Enter amount"
                                className="w-full"
                                options={savings.map((saving) => {
                                    return {
                                        id: +saving.id,
                                        value: saving.name,
                                    };
                                })}
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormCustomInput
                                label="Enter your amount you want to add"
                                placeholder="Enter amount"
                                className="w-full"
                                type="number"
                                field={field}
                            />
                        )}
                    />

                    <div className="flex justify-end">
                        <Button variant="outline" className="flex items-center gap-2">
                            Add
                        </Button>
                    </div>
                </Card>
            </form>
        </Form>
    );
};

export default AddToSavingForm;

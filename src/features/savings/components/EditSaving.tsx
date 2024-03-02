'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import FormDatePicker from 'src/components/form/FormDatePicker';
import { Form, FormField, FormLabel } from 'src/components/form/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'src/store/hooks';
import * as z from 'zod';

import { savingSchema } from '../../transactions/model/savingSchema';
import { Saving } from '../../transactions/model/transactionModel';
import { updateSaving } from '../../transactions/transactionSlice';

interface EditSavingProps extends Saving {
    additionalAction?: () => void;
}

const EditSaving = (props: EditSavingProps) => {
    const { name, goalAmount, currentlySaved, additionalAction, date, id } = props;

    const dispatch = useAppDispatch();

    const defaultValues = {
        name,
        goalAmount,
        currentlySaved,
        date,
    };

    const form = useForm<z.infer<typeof savingSchema>>({
        resolver: zodResolver(savingSchema),
        defaultValues,
    });

    const onSubmit = (data: z.infer<typeof savingSchema>) => {
        dispatch(
            updateSaving({
                id: id,
                name: data.name,
                goalAmount: data.goalAmount,
                currentlySaved: data.currentlySaved,
                date: data.date,
            })
        );

        if (additionalAction !== undefined) {
            additionalAction();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[610px] space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormCustomInput
                            label="Give your financial goal a name"
                            placeholder="e.g. Emergency Fund, Dream Vacation, Home Purchase"
                            className="w-full"
                            field={field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="goalAmount"
                    render={({ field }) => (
                        <FormCustomInput
                            label="Enter your goal amount"
                            placeholder="Enter amount"
                            className="w-full"
                            type="number"
                            field={field}
                        />
                    )}
                />

                <div className="space-y-1">
                    <FormLabel>
                        Enter your current savings and target savings date:
                        {<span className="ml-1 text-sky-600">*</span>}
                    </FormLabel>
                    <div className="flex items-end gap-2">
                        <FormField
                            control={form.control}
                            name="currentlySaved"
                            render={({ field }) => (
                                <FormCustomInput placeholder="Enter amount" className="w-full" type="number" field={field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => <FormDatePicker disableBefore field={field} />}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" className="flex items-center gap-2">
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditSaving;

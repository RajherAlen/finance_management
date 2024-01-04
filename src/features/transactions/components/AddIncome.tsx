'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormCustomInput from 'src/components/form/FormCustomInput';
import { Form, FormField } from 'src/components/form/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useAppDispatch } from 'src/store/hooks';
import * as z from 'zod';

import { incomeSchema } from '../model/incomeSchema';
import { setTotalIncome } from '../transactionSlice';

const AddIncome = ({ checkValidation, additionalAction }: { checkValidation?: boolean, additionalAction?: () => void  }) => {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof incomeSchema>>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof incomeSchema>) => {
        dispatch(setTotalIncome(values.amount));
        
        if (additionalAction !== undefined) {
            additionalAction();
        }
    };

    useEffect(() => {
        if (checkValidation) {
            form.trigger('amount');
        }
    }, [checkValidation, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => <FormCustomInput requiered className="flex-1" label="Amount" field={field} type="number" />}
                    />
                    <Button variant="outline" className="mt-7 flex items-center gap-2">
                        <PlusCircleIcon width={16} height={16} stroke="#1B2327" />
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddIncome;

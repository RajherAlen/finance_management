import * as z from 'zod';

export const savingSchema = z.object({
    goalAmount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }),
    currentlySaved: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }),
    name: z
        .string({
            required_error: 'This field is required',
        })
        .min(1, { message: 'Please add financial goal name' }),
    date: z.date({
        required_error: 'Please set date',
    }),
});

export const addToSavingSchema = z.object({
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }),
    savingName: z.string({
        required_error: 'This field is required',
    }),
});

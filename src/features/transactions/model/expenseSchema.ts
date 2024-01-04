import * as z from 'zod';

export const expenseSchema = z.object({
    amount: z.coerce
        .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .positive({ message: 'Amount must be positive number' }),
    description: z
        .string({
            required_error: 'This field is required',
        })
        .min(1, { message: 'Please add description' }),
    date: z.date(),
});

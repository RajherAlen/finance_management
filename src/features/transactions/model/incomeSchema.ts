import * as z from 'zod';

export const incomeSchema = z.object({
    amount: z.coerce
        .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .positive({ message: 'Amount must be positive number' }),
});

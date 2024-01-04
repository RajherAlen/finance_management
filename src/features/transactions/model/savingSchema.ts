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
});

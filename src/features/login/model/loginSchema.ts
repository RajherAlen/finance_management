import * as z from 'zod';

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'This field is required',
        })
        .trim()
        .min(6, { message: 'Please enter email address' }),
    password: z
        .string({
            required_error: 'This field is required',
        })
        .min(6, { message: 'Please enter password' }),
});

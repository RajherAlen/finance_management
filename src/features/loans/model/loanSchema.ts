import * as z from 'zod';

export const loanSchema = z.object({
    name: z.string({
        required_error: 'Please set some loan name',
    }),
    totalAmount: z.coerce.number({
        required_error: 'Amount is required',
    }),
    startDate: z.string({
        required_error: 'Please set start date',
    }),
    endDate: z.string({
        required_error: 'Please set end date',
    }),
    totalInstalments: z.coerce.number({
        required_error: 'Please set total instalments',
    }),
    currentInstalment: z.coerce.number({
        required_error: 'Please set current instalment',
    }),
    instalmentAmount: z.coerce.number({
        required_error: 'Please set instalment amount',
    }),
});

import * as z from 'zod';

export const IncomeAndExpensesSchema = z.object({
    incomeAmount: z.coerce
        .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .positive({ message: 'Amount must be positive number' }),
    expenseAmount: z.number().min(1, { message: 'Please enter positive number' }),
});

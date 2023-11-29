import * as z from "zod";

export const IncomeAndExpensesSchema = z.object({
	incomeAmount: z.number().min(1, { message: "Please enter positive number" }),
	expenseAmount: z.number().min(1, { message: "Please enter positive number" })
});

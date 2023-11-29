import * as z from "zod";

export const accountInfoSchema = z.object({
	fullName: z
		.string({
			required_error: "This field is required"
		})
		.trim()
		.min(6),
	username: z
		.string({
			required_error: "This field is required"
		})
		.trim()
		.min(6),
	jobRole: z.string()
});

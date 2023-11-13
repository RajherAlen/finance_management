"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField } from "src/components/form/form";
import Button from "src/components/button/Button";
import FormCustomInput from "src/components/form/FormCustomInput";
import { incomeSchema } from "../model/incomeSchema";
import Modal from "src/components/dialog/Modal";
import { PlusCircleIcon } from "lucide-react";

const AddIncome = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof incomeSchema>>({
		resolver: zodResolver(incomeSchema),
		defaultValues: {
			amount: 0,
			description: ""
		}
	});

	const onSubmit = (values: z.infer<typeof incomeSchema>) => {
		console.log(values);
	};

	return (
		<Modal
			open={isOpen}
			onOpenChange={() => setIsOpen(!isOpen)}
			trigger={<PlusCircleIcon stroke="#4b5563" width="16" height="16" />}
			title={`Add income`}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3"
				>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormCustomInput
								requiered
								label="Amount"
								field={field}
								type="number"
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormCustomInput
								label="Description"
								field={field}
							/>
						)}
					/>
					<Button type="submit" className="mt-5">
						Submit
					</Button>
				</form>
			</Form>
		</Modal>
	);
};

export default AddIncome;

"use client";

import React from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../model/loginSchema";

import FormCustomInput from "src/components/form/FormCustomInput";
import { Form, FormField } from "src/components/form/form";

import TransactionIcons from "src/features/transactions/components/TransactionIcons";

import Button from "src/components/button/Button";
import Card from "src/components/card/Card";

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = (data: z.infer<typeof loginSchema>) => {
		console.log(data);
	};

	return (
		<Card className="flex-1 h-full flex flex-col justify-center items-center rounded-2xl">
			<TransactionIcons type="login" width={48} height={48} />
			<h1 className="text-3xl font-bold mt-5 mb-3">Login</h1>

			<p className="text-sm text-[#A3AEB4] font-normal mb-8">
				Enter your credensialts to sign in to application
			</p>

			<div className="max-w-[400px] w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-5"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormCustomInput
									requiered
									placeholder="Enter email address"
									label="Enter email"
									className="w-full"
                                    type="email"
									field={field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormCustomInput
									requiered
									label="Enter Password"
									placeholder="Enter Password"
									className="w-full"
									field={field}
									type="password"
								/>
							)}
						/>

						<Button
							type="submit"
							variant="primary"
							size="lg"
							className="mt-5 w-full"
						>
							Sign In
						</Button>
					</form>
				</Form>
			</div>
		</Card>
	);
};

export default LoginForm;

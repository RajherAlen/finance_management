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
import { nextStep, setLoginInfo } from "../loginSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

const LoginForm = () => {
	const loginStore = useAppSelector((state) => state.loginStore);
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: loginStore.email,
			password: loginStore.password
		}
	});

	const onSubmit = (data: z.infer<typeof loginSchema>) => {
		dispatch(setLoginInfo(data));
		// TODO
		// IF user exist just redirect to dashboard
		dispatch(nextStep());
	};

	return (
		<>
			<TransactionIcons type="login" width={48} height={48} />
			<h1 className="text-3xl font-bold mt-5 mb-3">Login</h1>

			<p className="text-sm text-muted font-normal mb-8">
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
							size="lg"
							className="mt-5 w-full"
						>
							Sign In
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default LoginForm;

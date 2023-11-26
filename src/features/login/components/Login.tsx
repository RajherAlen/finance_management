"use client";

import React from "react";
import LoginInfoCard from "./LoginInfoCard";
import LoginForm from "./LoginForm";
import { useAppSelector } from "src/store/hooks";
import OnboardingStep1 from "./onboarding/OnboardingStep1";
import Card from "src/components/card/Card";
import OnboardingStep2 from "./onboarding/OnboardingStep2";

const Login = () => {
	const loginStore = useAppSelector((state) => state.loginStore);

	let formContent;
	switch (loginStore.currentStep) {
		case 0:
			formContent = <LoginForm />;
			break;
		case 1:
			formContent = <OnboardingStep1 />;
			break;
		case 2:
			formContent = <OnboardingStep2 />;
			break;
		case 3:
			formContent = <OnboardingStep2 />;
			break;
		default:
			break;
	}

	return (
		<div className="flex gap-12 h-full">
			<Card className="flex-1 h-full flex flex-col justify-center items-center rounded-2xl" size="xlrg">
				{formContent}
			</Card>
			<LoginInfoCard currentStep={loginStore.currentStep} />
		</div>
	);
};

export default Login;

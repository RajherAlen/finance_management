"use client";

import React from "react";
import Button from "src/components/button/Button";
import { nextStep, prevStep } from "../../loginSlice";
import { useAppDispatch } from "src/store/hooks";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	const handleBack = () => {
		dispatch(prevStep());
	};

	const handleNext = () => {
		dispatch(nextStep());
	};
	return (
		<div className="flex flex-col h-full">
			<div className="flex-1">{children}</div>

			<div className="flex justify-between">
				<Button onClick={handleBack} size="lg">
					Go Back
				</Button>
				<Button onClick={handleNext} size="lg">
					Continue
				</Button>
			</div>
		</div>
	);
};

export default OnboardingLayout;

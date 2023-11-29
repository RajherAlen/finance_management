"use client";

import React from "react";
import Button from "src/components/button/Button";
import { nextStep, prevStep } from "../../loginSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Stepper from "src/components/stepper/Stepper";

interface OnboardingLayoutProps {
	children: React.ReactNode;
	actionToContinue: any;
	formIsValid: boolean
}

const OnboardingLayout = ({ children, actionToContinue, formIsValid }: OnboardingLayoutProps) => {
	const loginStore = useAppSelector((state) => state.loginStore);
	const dispatch = useAppDispatch();

	const handleBack = () => {
		dispatch(prevStep());
	};

	const handleNext = () => {
		actionToContinue();

		if(formIsValid) {
			dispatch(nextStep());
		}
	};
	return (
		<div className="flex flex-col h-full w-full gap-5">
			<div>
				<Stepper
					totalSteps={3}
					currentStep={loginStore.currentStep - 1}
					type="default"
				/>
				<div className="flex justify-between gap-2 items-center mt-8 mb-2">
					<p className="text-xs text-muted">
						Welcome! First things first...
					</p>
					<p className="text-xs text-muted">
						{loginStore.currentStep} out of 3
					</p>
				</div>
			</div>

			<div className="flex flex-col flex-1">{children}</div>

			<div className="flex justify-between">
				<div>
					{loginStore.currentStep > 1 && (
						<Button
							variant="outline"
							onClick={handleBack}
							size="lg"
							className="flex items-center gap-1"
						>
							<ArrowLeft width={16} height={16} />
							Go Back
						</Button>
					)}
				</div>
				<Button
					onClick={handleNext}
					size="lg"
					className="flex items-center gap-1"
				>
					Continue
					<ArrowRight width={16} height={16} />
				</Button>
			</div>
		</div>
	);
};

export default OnboardingLayout;

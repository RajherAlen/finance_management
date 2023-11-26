"use client";

import React from "react";
import Button from "src/components/button/Button";
import { nextStep, prevStep } from "../../loginSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ArrowLeft, ArrowRight } from "lucide-react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
	const loginStore = useAppSelector((state) => state.loginStore);
    const dispatch = useAppDispatch();

	const handleBack = () => {
		dispatch(prevStep());
	};

	const handleNext = () => {
		dispatch(nextStep());
	};
	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-1">{children}</div>

			<div className="flex justify-between">
                <div>
                    {loginStore.currentStep > 1 &&
                        <Button variant="outline" onClick={handleBack} size="lg" className="flex items-center gap-1">
                            <ArrowLeft width={16} height={16} />
                            Go Back
                        </Button>
                    }
                </div>
				<Button onClick={handleNext} size="lg" className="flex items-center gap-1">
					Continue
					<ArrowRight width={16} height={16} />
				</Button>
			</div>
		</div>
	);
};

export default OnboardingLayout;

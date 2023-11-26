import clsx from "clsx";
import React from "react";

interface StepperProps {
	totalSteps: number;
	currentStep: number;
}

const Stepper = ({ totalSteps, currentStep }: StepperProps) => {
	const totalStepsNum = Array(totalSteps).fill("");

	return (
		<div className="flex gap-2">
			{totalStepsNum.map((item, index) => (
				<div
					key={Math.random()}
					className={clsx(
						"h-1 bg-[#D3DADD] w-5 rounded",
						currentStep === index + 1 ? "bg-[#F75708] w-[64px]" : ""
					)}
				></div>
			))}
		</div>
	);
};

export default Stepper;

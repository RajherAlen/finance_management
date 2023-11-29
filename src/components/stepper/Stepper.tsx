import clsx from "clsx";
import React from "react";

interface StepperProps {
	totalSteps: number;
	currentStep: number;
	type?: 'primary' | 'default'
}

const Stepper = ({ totalSteps, currentStep, type = 'primary' }: StepperProps) => {
	const totalStepsNum = Array(totalSteps).fill("");

	return (
		<div className="flex gap-2">
			{totalStepsNum.map((_, index) => (
				<div
					key={Math.random()}
					className={clsx(
						"h-1 rounded",
						type === 'primary' && currentStep !== index ? 'bg-[#D3DADD] w-5 ': '',
						type === 'primary' && currentStep === index ? "bg-[#F75708] w-[64px]" : "",

						type === 'default' && 'w-[120px]',
						type === 'default' && currentStep < index ? 'bg-[#D3DADD]': '',
						type === 'default' && currentStep >= index ? "bg-[#252A33]" : "",
					)}
				></div>
			))}
		</div>
	);
};

export default Stepper;

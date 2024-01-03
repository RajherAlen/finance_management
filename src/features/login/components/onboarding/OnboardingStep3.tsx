"use client";

import React from "react";
import OnboardingLayout from "./OnboardingLayout";
import AddSaving from "src/features/transactions/components/AddSaving";

const OnboardingStep3 = () => {
	return (
		<OnboardingLayout formIsValid={true}>
			<AddSaving />
		</OnboardingLayout>
	);
};

export default OnboardingStep3;

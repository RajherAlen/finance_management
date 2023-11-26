import React from "react";
import Card from "src/components/card/Card";
import BudgetaryBlueprint from "./BudgetaryBlueprint";
import ProfilePersona from "./ProfilePersona";
import Stepper from "src/components/stepper/Stepper";
import FinancialFoundations from "./FinancialFoundations";
import GoalSettingExpedition from "./GoalSettingExpedition";

const LoginInfoCard = ({ currentStep }: { currentStep: number }) => {
	let loginInfoCard;

	switch (currentStep) {
		case 0:
			loginInfoCard = <BudgetaryBlueprint />;
			break;
		case 1:
			loginInfoCard = <ProfilePersona />;
			break;
		case 2:
			loginInfoCard = <FinancialFoundations />;
			break;
		case 3:
			loginInfoCard = <GoalSettingExpedition />;
			break;
		default:
			loginInfoCard = null;
	}
	return (
		<Card
			size="xlrg"
			variant="grey"
			className="w-[450px] flex flex-col justify-center items-center rounded-2xl"
		>
			{loginInfoCard}

			<div className="mt-20">
				<Stepper totalSteps={4} currentStep={currentStep} />
			</div>
		</Card>
	);
};

export default LoginInfoCard;

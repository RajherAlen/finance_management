import React from 'react';

import Card from 'src/components/card/Card';
import Stepper from 'src/components/stepper/Stepper';

import BudgetaryBlueprint from './BudgetaryBlueprint';
import FinancialFoundations from './FinancialFoundations';
import GoalSettingExpedition from './GoalSettingExpedition';
import ProfilePersona from './ProfilePersona';

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
            loginInfoCard = null;
            return null;
        // case 4:
        // return null;
        default:
            loginInfoCard = null;
    }
    return (
        <Card size="xlrg" variant="grey" className="flex w-[450px] flex-col items-center justify-center rounded-2xl">
            {loginInfoCard}

            <div className="mt-20">
                <Stepper totalSteps={4} currentStep={currentStep} />
            </div>
        </Card>
    );
};

export default LoginInfoCard;

'use client';

import React from 'react';

import Card from 'src/components/card/Card';

import { useAppSelector } from 'src/store/hooks';

import LoginForm from './LoginForm';
import LoginInfoCard from './LoginInfoCard';
import OnboardingStep1 from './onboarding/OnboardingStep1';
import OnboardingStep2 from './onboarding/OnboardingStep2';
import OnboardingStep3 from './onboarding/OnboardingStep3';
import OnboardingSuccess from './onboarding/OnboardingSuccess';

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
            formContent = <OnboardingStep3 />;
            break;
        case 4:
            formContent = <OnboardingSuccess />;
            break;
        default:
            break;
    }

    return (
        <div className="flex h-full gap-12">
            <Card className="flex h-full flex-1 flex-col items-center justify-center rounded-2xl" size="xlrg">
                {formContent}
            </Card>
            <LoginInfoCard currentStep={loginStore.currentStep} />
        </div>
    );
};

export default Login;

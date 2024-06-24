'use client';

import React from 'react';

import Button from 'src/components/button/Button';
import Stepper from 'src/components/stepper/Stepper';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { login } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useRegisterMutation } from '../../api/loginApi';
import { nextStep, prevStep } from '../../loginSlice';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    actionToContinue?: any;
    formIsValid: boolean;
}

const OnboardingLayout = ({ children, actionToContinue, formIsValid }: OnboardingLayoutProps) => {
    const loginStore = useAppSelector((state) => state.loginStore);
    const transactionStore = useAppSelector((state) => state.transactionStore);

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const handleBack = () => {
        dispatch(prevStep());
    };

    const handleNext = () => {
        if (actionToContinue) {
            actionToContinue();
        }

        if (formIsValid) {
            if (loginStore.currentStep === 2) {
                register({ ...loginStore, income: transactionStore.income });
            }

            if (!isLoading) {
                dispatch(nextStep());
            }
        }
    };

    return (
        <div className="flex h-full w-full flex-col gap-5">
            <div>
                <Stepper totalSteps={3} currentStep={loginStore.currentStep - 1} type="default" />
                <div className="mb-2 mt-8 flex items-center justify-between gap-2">
                    <p className="text-xs text-muted">Welcome! First things first...</p>
                    <p className="text-xs text-muted">{loginStore.currentStep} out of 3</p>
                </div>
            </div>

            <div className="flex flex-1 flex-col">{children}</div>

            <div className="flex justify-between">
                <div>
                    {loginStore.currentStep > 1 && (
                        <Button variant="outline" onClick={handleBack} size="lg" className="flex items-center gap-1">
                            <ArrowLeft width={16} height={16} />
                            Go Back
                        </Button>
                    )}
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

'use client';

import React from 'react';

import AddSaving from 'src/features/transactions/components/AddSaving';

import { SavingsListDisplay } from 'src/features/savings';

import OnboardingLayout from './OnboardingLayout';

const OnboardingStep3 = () => {
    return (
        <OnboardingLayout formIsValid={true}>
            <div className="grid h-full grid-cols-2 gap-10">
                <AddSaving />
                <SavingsListDisplay />
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingStep3;

'use client';

import React from 'react';

import AddSaving from 'src/features/transactions/components/AddSaving';

import OnboardingLayout from './OnboardingLayout';

const OnboardingStep3 = () => {
    return (
        <OnboardingLayout formIsValid={true}>
            <AddSaving />
        </OnboardingLayout>
    );
};

export default OnboardingStep3;

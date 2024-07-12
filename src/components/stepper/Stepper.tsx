import React from 'react';

import clsx from 'clsx';

interface StepperProps {
    totalSteps: number;
    currentStep: number;
    type?: 'primary' | 'default';
}

const Stepper = ({ totalSteps, currentStep, type = 'primary' }: StepperProps) => {
    const totalStepsNum = Array(totalSteps).fill('');

    return (
        <div className="flex gap-2">
            {totalStepsNum.map((_, index) => (
                <div
                    key={Math.random()}
                    className={clsx(
                        'h-1 rounded',
                        type === 'primary' && currentStep !== index ? 'w-5 bg-[#D3DADD] ' : '',
                        type === 'primary' && currentStep === index ? 'w-[64px] bg-[#F75708]' : '',

                        type === 'default' && 'w-[120px]',
                        type === 'default' && currentStep < index ? 'bg-[#D3DADD]' : '',
                        type === 'default' && currentStep >= index ? 'bg-[#252A33]' : ''
                    )}
                ></div>
            ))}
        </div>
    );
};

export default Stepper;

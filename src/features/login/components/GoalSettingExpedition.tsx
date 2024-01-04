import React from 'react';

import GoalIcon from 'src/components/icons/goal-icon.svg';

import Image from 'next/image';

const GoalSettingExpedition = () => {
    return (
        <div className="flex flex-col items-center">
            <Image src={GoalIcon} width={200} height={200} alt="Picture of the author" />
            <h1 className="mb-3 mt-5 text-xl font-bold">Goal Setting Expedition</h1>
            <p className="text-center text-sm font-normal text-muted">
                Articulate your short-term and long-term financial aspirations. Specify monetary targets, desired timelines, and prioritize
                each goal accordingly.
            </p>
        </div>
    );
};

export default GoalSettingExpedition;

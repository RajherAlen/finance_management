import React from 'react';

import Card from './Card';
import { EmptyStateIcon } from './svg';

interface EmptyStateProps {
    title: string;
    description?: string;
    actionComponent?: React.ReactNode
}

const EmptyState = ({ title, description, actionComponent }: EmptyStateProps) => {
    return (
        <Card className="flex flex-col items-center justify-center gap-4 text-center">
            <EmptyStateIcon />

            <div className="mb-3">
                <p className="mb-1 text-xl font-bold">{title}</p>
                <p className="text-sm text-slate-600">{description}</p>
            </div>

            {actionComponent}
        </Card>
    );
};

export default EmptyState;

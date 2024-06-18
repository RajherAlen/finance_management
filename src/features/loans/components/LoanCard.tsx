import React from 'react';

import Card from 'src/components/card/Card';
import { ProgressBar } from 'src/components/progress/ProgressBar';

import formatCurrency from 'src/lib/utils/formatCurrency';

interface LoanCardProps {
    value: number;
    total: number;
    startDate: string;
    endDate: string;
    status: string;
}

const LoanCard = (props: LoanCardProps) => {
    const { startDate, endDate, status, value, total } = props;

    return (
        <Card className="max-w-lg">
            <ProgressBar label="Kredit 1" value={value} total={total} />

            <span className="mr-1 text-xs font-bold text-muted">{formatCurrency(208)}</span>
            <span className="mr-1 text-xs text-muted">per month</span>

            <div className="mt-3 grid grid-cols-3">
                <div>
                    <p className="text-xs text-muted">Start Date</p>
                    <p className="text-sm">{startDate}</p>
                </div>

                <div>
                    <p className="text-xs text-muted">End Date</p>
                    <p className="text-sm">{endDate}</p>
                </div>

                <div className="flex flex-col items-start">
                    <p className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">{status}</p>
                </div>
            </div>
        </Card>
    );
};

export default LoanCard;

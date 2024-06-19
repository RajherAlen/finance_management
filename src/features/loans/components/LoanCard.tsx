import React from 'react';

import Card from 'src/components/card/Card';
import { ProgressBar } from 'src/components/progress/ProgressBar';

import { format } from 'date-fns';
import formatCurrency from 'src/lib/utils/formatCurrency';

import { Loan } from '../model/loanModel';

const LoanCard = (props: Loan) => {
    const { startDate, endDate, totalAmount, instalmentAmount, currentInstalment, totalInstalments } = props;

    const status = totalInstalments === currentInstalment ? 'Completed' : 'Ongoing';

    return (
        <Card className="max-w-lg">
            <ProgressBar label="Kredit 1" value={currentInstalment * instalmentAmount} total={totalInstalments * instalmentAmount} />

            <div className="flex items-center justify-between gap-2">
                <div>
                    <span className="mr-1 text-xs font-bold text-muted">{formatCurrency(instalmentAmount)}</span>
                    <span className="mr-1 text-xs text-muted">per month</span>
                </div>

                <p className="text-xs font-bold text-muted">
                    {currentInstalment}/{totalInstalments}
                </p>
            </div>

            <div className="mt-3 grid grid-cols-3">
                <div>
                    <p className="text-xs text-muted">Start Date</p>
                    <p className="text-sm">{String(startDate)}</p>
                </div>

                <div>
                    <p className="text-xs text-muted">End Date</p>
                    <p className="text-sm">{String(endDate)}</p>
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-xs text-muted">Status</p>
                    <p className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">{status}</p>
                </div>
            </div>
        </Card>
    );
};

export default LoanCard;

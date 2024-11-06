import React from 'react';

import Card from 'src/components/card/Card';
import { ProgressBar } from 'src/components/progress/ProgressBar';

import 'src/features/notification/notificationSlice';

import { cn } from 'src/lib/utils/cn';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { formatDate } from 'src/lib/utils/formatDate';

import { Loan } from '../model/loanModel';
import { checkIsLoanCompleted } from '../utils/checkIsLoanCompleted';

const LoanCard = (props: Loan) => {
    const { startDate, endDate, instalmentAmount, name, totalAmount, totalInstalments } = props;

    const { isCompleted, status, currentInstalment } = checkIsLoanCompleted({
        startDate,
        endDate,
        totalInstalments,
    });

    return (
        <Card className='max-w-lg'>
            <ProgressBar
                label={
                    <p className='text-xs'>
                        {name}
                        <span className='ml-1 text-[10px] font-medium'>({formatCurrency(totalAmount)})</span>
                    </p>
                }
                isFinished={isCompleted}
                value={currentInstalment * instalmentAmount}
                total={totalInstalments * instalmentAmount}
            />

            <div className='flex items-center justify-between gap-2'>
                <div>
                    <span className='mr-1 text-xs font-bold text-muted'>{formatCurrency(instalmentAmount)}</span>
                    <span className='mr-1 text-xs text-muted'>per month</span>
                </div>

                <p className='text-xs font-bold text-muted'>
                    {isCompleted ? totalInstalments : currentInstalment}/{totalInstalments}
                </p>
            </div>

            <div className='mt-3 grid grid-cols-3'>
                <div>
                    <p className='text-xs text-muted'>Start Date</p>
                    <p className='text-sm'>{formatDate({ date: new Date(startDate) })}</p>
                </div>

                <div>
                    <p className='text-xs text-muted'>End Date</p>
                    <p className='text-sm'>{formatDate({ date: new Date(endDate) })}</p>
                </div>

                <div className='flex flex-col items-start'>
                    <p className='text-xs text-muted'>Status</p>
                    <p
                        className={cn(
                            'font-mediu me-2  rounded px-2.5 py-0.5 text-xs',
                            isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        )}
                    >
                        {status}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default LoanCard;

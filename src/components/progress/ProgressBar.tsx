'use client';

import * as React from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { calcPercentage } from 'src/lib/utils/calcPercentage';
import { cn } from 'src/lib/utils/cn';
import formatCurrency from 'src/lib/utils/formatCurrency';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn('relative h-3 w-full overflow-hidden rounded-full bg-[#A3AEB44D]/20')} {...props}>
        <ProgressPrimitive.Indicator
            className={cn('h-full w-full flex-1 bg-slate-600 transition-all', className)}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

interface ProgressBarProps {
    label?: string | React.ReactNode;
    value: number;
    total: number;
    additionalComponent?: React.ReactNode;
    isFinished?: boolean;
    hideDifferencValue?: boolean;
}

export const ProgressBar = ({ label, value, total, additionalComponent, isFinished, hideDifferencValue }: ProgressBarProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-3">
                {label && <div className="text-xs">{label}</div>}

                <div className="flex gap-2">
                    <div className='text-right'>
                        <p className="text-xs font-bold">
                            {formatCurrency(value ? value : 0)}/{formatCurrency(total)}
                        </p>

                        {!hideDifferencValue && total - value > 0 && <p className="text-xs font-semibold text-red-400">-{formatCurrency(total - value)}</p>}
                    </div>

                    {additionalComponent}
                </div>
            </div>
            <Progress value={calcPercentage(value, total)} className={cn('rounded-full',isFinished ? 'bg-green-500' : '')} />
        </div>
    );
};

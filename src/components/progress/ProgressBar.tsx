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
    <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-3 w-full overflow-hidden rounded-full bg-[#A3AEB44D]/20', className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-muted transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

interface ProgressBarProps {
    label: string;
    value: number;
    total: number;
    additionalComponent?: React.ReactNode;
}

export const ProgressBar = ({ label, value, total, additionalComponent }: ProgressBarProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-3">
                <p className="text-xs">{label}</p>
                <div className="flex gap-2">
                    <p className="text-xs font-bold">
                        {formatCurrency(value ? value : 0)}/{formatCurrency(total)}
                    </p>
                    {additionalComponent}
                </div>
            </div>
            <Progress value={calcPercentage(value, total)} />
        </div>
    );
};

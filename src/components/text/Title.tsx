import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils/cn';

const titleVariants = cva('font-semibold text-gray-700 mb-2', {
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

const Title = ({ children, size, className }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg'; className?: string }) => {
    return <p className={cn(titleVariants({ size, className }))}>{children}</p>;
};

export default Title;

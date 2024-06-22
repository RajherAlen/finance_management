import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { createPortal } from 'react-dom';
import { cn } from 'src/lib/utils/cn';
import { buttonVariants } from '../button/Button';

interface DropdownProps {
    children: React.ReactNode,
    trigger: React.ReactNode
    className?: string
    contentClassName?: string
    asChild?: boolean
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    size?: "reset" | "default" | "sm" | "lg" | "icon" | null | undefined
}

const Dropdown = ({ trigger, children, className, asChild, variant = "default", size, contentClassName }: DropdownProps) => {
    return (
        <Popover>
            <PopoverTrigger
                className={buttonVariants({ variant: variant, size: size, className: className })}
                asChild={asChild}
            >
                {trigger}
            </PopoverTrigger>

            {createPortal(
                <PopoverContent
                    side="bottom"
                    sideOffset={5}
                    align="end"
                    className={cn('flex flex-col p-2 bg-white rounded-lg shadow-sm', contentClassName)}
                >
                    {children}
                </PopoverContent>,
                document.body
            )}
        </Popover>
    );
};

export default Dropdown;

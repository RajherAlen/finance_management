import React from 'react'
import { cn } from 'src/lib/utils/cn';

interface DropdownItemProps {
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string
}

const DropdownItem = ({ disabled, children, onClick, className }: DropdownItemProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center gap-2 p-2 hover:bg-[#EFF2F6]/30 text-xs rounded transition-all duration-150 whitespace-nowrap',
                className,
                disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'
            )}
        >
            {children}
        </div>
    );
}

export default DropdownItem
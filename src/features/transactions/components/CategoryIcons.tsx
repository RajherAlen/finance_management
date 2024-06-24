import React from 'react';

import Card from 'src/components/card/Card';

import { CarIcon, CoinsIcon, CreditCardIcon, HomeIcon, PiggyBankIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';

interface CategoryIconsProps {
    category: string;
    width?: number;
    height?: number;
}

const CategoryIcons = ({ category, width = 18, height = 18 }: CategoryIconsProps) => {
    let transactionIcon,
        bgClassName = 'bg-[#EBEBEB]';

    const iconSize = {
        width: width,
        height: height,
        stroke: '#1f1f1f',
    };

    switch (category) {
        case 'savings':
            // bgClassName = 'bg-green-500/20';
            transactionIcon = <PiggyBankIcon {...iconSize} />;
            break;
        case 'needs':
            transactionIcon = <CoinsIcon {...iconSize} />;
            // bgClassName = 'bg-red-500/20';
            break;
        case 'loan':
            transactionIcon = <CreditCardIcon {...iconSize} />;
            // bgClassName = 'bg-orange-500/20';
            break;
        default:
            transactionIcon = <CoinsIcon {...iconSize} />;
            // bgClassName = 'bg-red-500/20';
            break;
    }

    return (
        <Card radius="full" size="sml" className={cn('flex h-[48px] w-[48px] items-center justify-center', bgClassName)}>
            {transactionIcon}
        </Card>
    );
};

export default CategoryIcons;

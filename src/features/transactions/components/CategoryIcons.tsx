import React from 'react';

import Card from 'src/components/card/Card';

import { CarIcon, CoinsIcon, HomeIcon } from 'lucide-react';

interface CategoryIconsProps {
    category: string;
    width?: number;
    height?: number;
}

const CategoryIcons = ({ category, width = 18, height = 18 }: CategoryIconsProps) => {
    let transactionIcon;

    const iconSize = {
        width: width,
        height: height,
        stroke: '#1f1f1f',
    };

    switch (category) {
        case 'car':
            transactionIcon = <CarIcon {...iconSize} />;
            break;
        case 'house':
            transactionIcon = <HomeIcon {...iconSize} />;
            break;
        default:
            transactionIcon = <CoinsIcon {...iconSize} />;
            break;
    }

    return (
        <Card variant="grey" radius="full" size="sml" className="flex h-[48px] w-[48px] items-center justify-center">
            {transactionIcon}
        </Card>
    );
};

export default CategoryIcons;

import React from 'react';

import Card from 'src/components/card/Card';

import { CircleDollarSign, CreditCardIcon, Landmark, PiggyBankIcon, Wallet } from 'lucide-react';

interface TransactionIconsProps {
    type: string;
    width?: number;
    height?: number;
}

const TransactionIcons = ({ type, width = 24, height = 24 }: TransactionIconsProps) => {
    let transactionIcon;
    let transactionTypeColor: 'success' | 'warning' | 'info' | 'error' | 'caution';

    const iconSize = {
        width: width,
        height: height,
    };

    switch (type) {
        case 'income':
            transactionIcon = <CircleDollarSign stroke="#f97316" {...iconSize} />;
            transactionTypeColor = 'warning';
            break;
        case 'expense':
            transactionIcon = <CreditCardIcon stroke="#dc2626" {...iconSize} />;
            transactionTypeColor = 'error';
            break;
        case 'savings':
            transactionIcon = <PiggyBankIcon stroke="#10b981" {...iconSize} />;
            transactionTypeColor = 'success';
            break;
        case 'budget':
            transactionIcon = <Wallet stroke="#0ea5e9" {...iconSize} />;
            transactionTypeColor = 'info';
            break;
        case 'login':
            transactionIcon = <Wallet stroke="#1f1f1f" {...iconSize} />;
            transactionTypeColor = 'caution';
            break;
        default:
            transactionTypeColor = 'error';
            transactionIcon = <Wallet stroke="#dc2626" {...iconSize} />;
            break;
    }

    return (
        <Card variant={transactionTypeColor} size="sml" className="flex items-center">
            {transactionIcon}
        </Card>
    );
};

export default TransactionIcons;

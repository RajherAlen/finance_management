import React from 'react';

import Card from 'src/components/card/Card';

import formatCurrency from 'src/lib/utils/formatCurrency';

import AddTransaction from './AddTransaction';
import TransactionIcons from './TransactionIcons';

interface TransactionCardProps {
    type: 'income' | 'expense' | 'savings' | 'budget';
    amount: number;
    additionalAction?: React.ReactNode;
}

const TransactionCard = (props: TransactionCardProps) => {
    return (
        <Card className="flex min-w-[200px] flex-1 flex-col justify-center">
            <div className="flex justify-end">{props.additionalAction}</div>
            <div className="flex gap-2">
                <TransactionIcons type={props.type} />

                <div className="flex flex-1 flex-col gap-1">
                    <p className="text-lg font-bold">{formatCurrency(props.amount ? props.amount : 0)}</p>
                    <p className="text-xs uppercase text-muted">{props.type}</p>
                </div>
            </div>
        </Card>
    );
};

export default TransactionCard;

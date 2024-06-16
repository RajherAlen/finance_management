import React from 'react';

import Button from 'src/components/button/Button';

import { useGetSavingsQuery, useUpdateSavingMutation } from 'src/features/savings/api/savingsApi';

import { RefreshCwIcon, XIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { formatDate } from 'src/lib/utils/formatDate';
import { useAppSelector } from 'src/store/hooks';

import { useDeleteTransactionMutation } from '../api/transactionsApi';
import { Saving, Transaction } from '../model/transactionModel';
import CategoryIcons from './CategoryIcons';

const ExpenseCard = (props: Transaction) => {
    const { description, amount, date, id, recuring, category } = props;

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetSavingsQuery(userInfo?.id);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const [updateSaving] = useUpdateSavingMutation();

    const handleDeleteTransaction = () => {
        const selectedSaving = data.savings.filter((saving: Saving) => saving.name === description);

        if (selectedSaving.length > 0) {
            updateSaving({ ...selectedSaving[0], currentlySaved: selectedSaving[0].currentlySaved - amount });
        }

        deleteTransaction({ userId: 1, transactionId: id });
    };

    return (
        <div className="flex items-center gap-5">
            <div className="flex flex-1 gap-3">
                <CategoryIcons category="house" />

                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-base font-medium">{formatCurrency(amount)}</p>
                        <p
                            className={cn(
                                'mb-[2px] flex items-center gap-1.5 rounded-full bg-primary px-2 py-1 text-[11px] font-medium',
                                category === 'savings' ? 'bg-lime-300/50' : category === 'wants' ? 'bg-red-300/20' : ''
                            )}
                        >
                            {recuring && <RefreshCwIcon size={10} />}
                            {description}
                        </p>
                    </div>

                    <p className="text-xs text-muted">{formatDate({ date: date, format: 'D.MM.YYYY' })}</p>
                </div>
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={handleDeleteTransaction}
                className="h-5 w-5 rounded-full border-black hover:border-black/10 hover:bg-black/10"
            >
                <XIcon width={14} height={14} />
            </Button>
        </div>
    );
};

export default ExpenseCard;

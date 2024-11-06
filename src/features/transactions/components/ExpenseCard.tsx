import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';

import { useGetSavingsQuery, useUpdateSavingMutation } from 'src/features/savings/api/savingsApi';

import { PiggyBankIcon, RefreshCwIcon, XIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { formatDate } from 'src/lib/utils/formatDate';
import { useAppSelector } from 'src/store/hooks';

import { useDeleteTransactionMutation, useUpdateTransactionMutation } from '../api/transactionsApi';
import { Saving, Transaction } from '../model/transactionModel';
import CategoryIcons from './CategoryIcons';

const ExpenseCard = (props: Transaction) => {
    const { description, amount, date, id, recurring, category } = props;

    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetSavingsQuery(userInfo?.id);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const [updateTransaction] = useUpdateTransactionMutation();
    const [updateSaving] = useUpdateSavingMutation();

    const handleCloseDeleteModal = () => {
        setDeleteIsOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setUpdateIsOpen(false);
    };

    const handleDeleteTransaction = () => {
        const selectedSaving = data.savings.filter((saving: Saving) => saving.name === description);

        if (selectedSaving.length > 0) {
            updateSaving({ ...selectedSaving[0], currentlySaved: selectedSaving[0].currentlySaved - amount });
        }

        deleteTransaction({ userId: userInfo.id, transactionId: id });
    };

    const handleUpdateRecuringTransaction = () => {
        updateTransaction({ userId: userInfo.id, transactionId: id });
    };

    const transactionName = category === 'loan' ? description.split('loan-')[1] : description;

    return (
        <div className='flex items-center gap-5'>
            <div className='flex flex-1 gap-3'>
                <CategoryIcons category={props.category} />

                <div>
                    <div className='flex items-center gap-2'>
                        <p className='text-base font-medium'>{formatCurrency(amount)}</p>
                        <p
                            className={cn(
                                'mb-[2px] flex items-center gap-1.5 rounded-full bg-primary px-2 py-1 text-[11px] font-medium',
                                category === 'savings'
                                    ? 'bg-lime-500/30'
                                    : category === 'wants'
                                    ? 'bg-red-500/30'
                                    : category === 'loan'
                                    ? 'bg-orange-500/30'
                                    : ''
                            )}
                        >
                            {recurring && (
                                <Modal
                                    open={updateIsOpen}
                                    onOpenChange={setUpdateIsOpen}
                                    triggerAsChild
                                    title='Update Recurring Transaction'
                                    description={'Are you sure you want to update this reccuring transaction? You can\'t undo this action.'}
                                    footer={
                                        <div className='flex gap-2'>
                                            <Button variant='ghost' onClick={handleCloseUpdateModal}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleUpdateRecuringTransaction} variant='destructive'>
                                                Update
                                            </Button>
                                        </div>
                                    }
                                    trigger={<RefreshCwIcon className='cursor-pointer' size={10} />}
                                >
                                    <div className='flex flex-col gap-1'>
                                        <p className='flex justify-between text-sm'>
                                            Name: <span className='font-semibold'>{transactionName}</span>
                                        </p>
                                        <p className='flex justify-between text-sm'>
                                            Amount: <span className='font-semibold'>{formatCurrency(amount)}</span>
                                        </p>
                                    </div>
                                </Modal>
                            )}
                            {transactionName}
                        </p>
                    </div>

                    <p className='text-xs text-muted'>{formatDate({ date: date, format: 'D.MM.YYYY' })}</p>
                </div>
            </div>

            <Modal
                open={deleteIsOpen}
                onOpenChange={setDeleteIsOpen}
                triggerAsChild
                title='Delete Transaction'
                description={'Are you sure you want to delete this transaction?'}
                footer={
                    <div className='flex gap-2'>
                        <Button variant='ghost' onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteTransaction} variant='destructive'>
                            Delete
                        </Button>
                    </div>
                }
                trigger={
                    <Button
                        variant='outline'
                        size='icon'
                        className='h-5 w-5 rounded-full border-black hover:border-black/10 hover:bg-black/10'
                    >
                        <XIcon width={14} height={14} />
                    </Button>
                }
            >
                <div className='flex flex-col gap-1'>
                    <p className='flex justify-between text-sm'>
                        Name: <span className='font-semibold'>{transactionName}</span>
                    </p>
                    <p className='flex justify-between text-sm'>
                        Amount: <span className='font-semibold'>{formatCurrency(amount)}</span>
                    </p>

                    <p className='flex justify-between text-sm'>
                        Recurring: <span className='font-semibold'>{recurring ? 'Yes' : 'No'}</span>
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ExpenseCard;

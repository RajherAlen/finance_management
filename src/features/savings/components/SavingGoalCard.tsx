'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import Modal from 'src/components/dialog/Modal';
import { ProgressBar } from 'src/components/progress/ProgressBar';
import EditSaving from 'src/features/savings/components/EditSaving';

import { Saving } from 'src/features/transactions/model/transactionModel';

import { Edit3Icon, Trash } from 'lucide-react';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useDeleteSavingMutation } from '../api/savingsApi';
import { calculateMonthlySavings } from '../utils/calculateMonthlySavings';
import { calculateSavingDateOfPayment } from '../utils/calculateSavingDateOfPayment';

const SavingGoalCard = (props: Saving) => {
    const { name, goalAmount, currentlySaved, id, date } = props;
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const { userInfo } = useAppSelector((state) => state.authStore);
    const [deleteSaving] = useDeleteSavingMutation();

    const savingDateOfPayment = calculateSavingDateOfPayment(date);

    const handleDeleteSaving = () => {
        deleteSaving({ id, userId: userInfo.id });

        handleCloseEditModal();
    };

    const handleCloseEditModal = () => {
        setEditIsOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setDeleteIsOpen(false);
    };

    const isFinished = goalAmount - currentlySaved === 0;

    return (
        <Card className="mb-4 w-96 max-w-md">
            <ProgressBar
                label={
                    <>
                        <span className="block text-sm font-semibold">{name}</span>
                        {isFinished ? (
                            <p className="my-1 inline-block rounded-full bg-green-500/80 px-3 py-1 text-xs font-semibold text-white">
                                Finished
                            </p>
                        ) : (
                            <>
                                <span className="mr-1 text-xs text-muted">{savingDateOfPayment.message}</span>
                                <span className="mr-1 text-xs text-muted">/</span>
                                <span className="mr-1 text-xs font-bold text-muted">
                                    {formatCurrency(
                                        calculateMonthlySavings(
                                            goalAmount - currentlySaved,
                                            savingDateOfPayment.monthsLeft ? savingDateOfPayment.monthsLeft : 0
                                        )
                                    )}
                                </span>
                                <span className="text-xs text-muted">per month</span>
                            </>
                        )}
                    </>
                }
                value={currentlySaved}
                isFinished={isFinished}
                total={goalAmount}
            />

            <div className="mt-3 flex justify-end gap-2">
                <Modal
                    open={editIsOpen}
                    triggerAsChild
                    onOpenChange={setEditIsOpen}
                    trigger={
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Edit3Icon width={16} height={16} cursor="pointer" />
                            Edit
                        </Button>
                    }
                >
                    <EditSaving additionalAction={handleCloseEditModal} {...props} />
                </Modal>
                <Modal
                    open={deleteIsOpen}
                    onOpenChange={setDeleteIsOpen}
                    triggerAsChild
                    title="Delete saving"
                    description="Are you sure you want to delete this saving?"
                    footer={
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={handleCloseDeleteModal}>
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteSaving} variant="destructive">
                                Delete
                            </Button>
                        </div>
                    }
                    trigger={
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Trash width={16} height={16} cursor="pointer" />
                            Delete
                        </Button>
                    }
                >
                    <div>
                        <p className="flex justify-between text-sm">
                            Name: <span className="font-semibold">{name}</span>
                        </p>
                        <p className="flex justify-between text-sm">
                            Amount: <span className="font-semibold">{formatCurrency(goalAmount)}</span>
                        </p>
                        <p className="flex justify-between text-sm">
                            Currently Saved: <span className="font-semibold">{formatCurrency(currentlySaved)}</span>
                        </p>
                    </div>
                </Modal>
            </div>
        </Card>
    );
};

export default SavingGoalCard;

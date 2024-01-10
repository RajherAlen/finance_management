'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import Modal from 'src/components/dialog/Modal';
import { ProgressBar } from 'src/components/progress/ProgressBar';
import EditSaving from 'src/features/transactions/components/EditSaving';

import { Saving } from 'src/features/transactions/model/transactionModel';
import { deleteSaving } from 'src/features/transactions/transactionSlice';

import { Edit3Icon, Trash } from 'lucide-react';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppDispatch } from 'src/store/hooks';
import Separator from 'src/components/separator/Separator';

const SavingGoalCard = (props: Saving) => {
    const dispatch = useAppDispatch();
    const { name, goalAmount, currentlySaved, id } = props;

    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const handleDeleteSaving = () => {
        dispatch(deleteSaving(id));
    };

    const handleCloseEditModal = () => {
        setEditIsOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setDeleteIsOpen(false);
    };

    return (
        <Card className="mb-4">
            <p className="font-semibold text-sm">{name}</p>

            <Separator />

            <ProgressBar value={currentlySaved} total={goalAmount} />
            
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

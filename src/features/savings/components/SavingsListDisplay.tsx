'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';
import AddSaving from 'src/features/transactions/components/AddSaving';

import { PlusCircleIcon } from 'lucide-react';
import { useAppSelector } from 'src/store/hooks';

import SavingGoalCard from './SavingGoalCard';

const SavingsListDisplay = () => {
    const { savings } = useAppSelector((state) => state.transactionStore);
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="max-w-md">
            <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-gray-700">Saving Goals</p>
                <Modal
                    open={isOpen}
                    triggerAsChild
                    onOpenChange={setIsOpen}
                    trigger={
                        <Button variant="outline" className="flex items-center gap-2" size="sm">
                            <PlusCircleIcon width={16} height={16} stroke="#1B2327" />
                            Add New saving
                        </Button>
                    }
                >
                    <AddSaving additionalAction={handleCloseModal} />
                </Modal>
            </div>

            {savings.map((saving) => {
                return (
                    <SavingGoalCard key={saving.id} {...saving} />
                );
            })}
        </div>
    );
};

export default SavingsListDisplay;

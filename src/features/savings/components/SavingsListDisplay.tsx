'use client';

import React, { useEffect, useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';
import GlobalLoader from 'src/components/loader/GlobalLoader';
import AddSaving from 'src/features/savings/components/AddSaving';

import { updateSaving } from 'src/features/transactions/transactionSlice';

import { PlusCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useDeleteSavingMutation, useGetSavingsQuery } from '../api/savingsApi';
import { Saving } from '../model/Saving';
import SavingGoalCard from './SavingGoalCard';

const SavingsListDisplay = () => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetSavingsQuery(userInfo?.id);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(updateSaving(data?.savings));
    }, [data, isLoading, dispatch]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    if (isLoading) return <GlobalLoader />;

    return (
        <div className="flex gap-5">
            <div>
                <div className="mb-4 flex max-w-md items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-gray-700">Savings</p>
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

                {data?.savings.map((saving: Saving) => {
                    return <SavingGoalCard key={saving.id} {...saving} />;
                })}
            </div>
        </div>
    );
};

export default SavingsListDisplay;

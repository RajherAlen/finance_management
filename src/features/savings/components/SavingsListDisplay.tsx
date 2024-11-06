'use client';

import React, { useEffect, useState } from 'react';

import Button from 'src/components/button/Button';
import EmptyState from 'src/components/card/EmptyState';
import Modal from 'src/components/dialog/Modal';
import GlobalLoader from 'src/components/loader/GlobalLoader';
import AddSaving from 'src/features/savings/components/AddSaving';

import { updateSaving } from 'src/features/transactions/transactionSlice';

import { PlusCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useDeleteSavingMutation, useGetSavingsQuery } from '../api/savingsApi';
import { Saving } from '../model/Saving';
import AddToSavingForm from './AddToSavingForm';
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
        <div className='flex h-full items-start gap-5'>
            <div className='flex h-full w-full max-w-lg flex-col'>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    <p className='text-sm font-semibold text-gray-700'>Savings</p>
                    <Modal
                        open={isOpen}
                        triggerAsChild
                        onOpenChange={setIsOpen}
                        trigger={
                            <Button variant='outline' className='flex items-center gap-2' size='sm'>
                                <PlusCircleIcon width={16} height={16} stroke='#1B2327' />
                                Add New saving
                            </Button>
                        }
                    >
                        <AddSaving additionalAction={handleCloseModal} />
                    </Modal>
                </div>

                <div className='flex h-full flex-col overflow-y-auto overflow-x-hidden pr-2'>
                    {data?.savings.length > 0 ? (
                        data?.savings.map((saving: Saving) => {
                            return <SavingGoalCard key={saving.id} {...saving} />;
                        })
                    ) : (
                        <EmptyState title='No savings yet' />
                    )}
                </div>
            </div>

            <AddToSavingForm savings={data?.savings} />
        </div>
    );
};

export default SavingsListDisplay;

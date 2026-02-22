'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/tabs/Tabs';

import { PlusCircleIcon } from 'lucide-react';

import { Loan } from '../model/loanModel';
import AddNewLoanForm from './AddNewLoanForm';
import LoanCard from './LoanCard';

interface LoansListDisplayProps {
    loans: Loan[];
}

const LoansListDisplay = ({ loans }: LoansListDisplayProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className='mb-4 flex max-w-lg items-center justify-between gap-4'>
                <p className='text-sm font-semibold text-gray-700'>Loans</p>
                <Modal
                    title='Add new loan'
                    open={isOpen}
                    triggerAsChild
                    onOpenChange={setIsOpen}
                    trigger={
                        <Button variant='outline' className='flex items-center gap-2' size='sm'>
                            <PlusCircleIcon width={16} height={16} stroke='#1B2327' />
                            Add new loan
                        </Button>
                    }
                >
                    <AddNewLoanForm additionalAction={handleCloseModal} />
                </Modal>
            </div>

            <Tabs defaultValue='ongoing' className='w-[400px]'>
                <TabsList>
                    <TabsTrigger value='ongoing'>Ongoing</TabsTrigger>
                    <TabsTrigger value='completed'>Completed</TabsTrigger>
                </TabsList>

                {['ongoing', 'completed'].map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue}>
                        <div className='flex flex-col gap-4'>
                            {loans
                                ?.filter((loan) => (tabValue === 'ongoing' ? !loan.isCompleted : loan.isCompleted))
                                .map((loan: Loan) => (
                                    <LoanCard key={loan.id || Math.random()} {...loan} />
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default LoansListDisplay;

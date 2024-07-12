'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';

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
            <div className="mb-4 flex max-w-lg items-center justify-between gap-4">
                <p className="text-sm font-semibold text-gray-700">Loans</p>
                <Modal
                    title="Add new loan"
                    open={isOpen}
                    triggerAsChild
                    onOpenChange={setIsOpen}
                    trigger={
                        <Button variant="outline" className="flex items-center gap-2" size="sm">
                            <PlusCircleIcon width={16} height={16} stroke="#1B2327" />
                            Add new loan
                        </Button>
                    }
                >
                    <AddNewLoanForm additionalAction={handleCloseModal} />
                </Modal>
            </div>

            <div className="flex flex-col gap-4">
                {loans?.map((loan: Loan) => {
                    return <LoanCard key={Math.random()} {...loan} />;
                })}
            </div>
        </div>
    );
};

export default LoansListDisplay;

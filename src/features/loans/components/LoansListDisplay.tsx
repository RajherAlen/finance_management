'use client';

import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';

import { PlusCircleIcon } from 'lucide-react';

import AddNewLoanForm from './AddNewLoanForm';
import LoanCard from './LoanCard';

const LoansListDisplay = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <div className="flex h-full items-start gap-5">
            <div className="mb-4 flex max-w-md items-center justify-between gap-4">
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

            <div className="flex flex-col gap-4">{/* <LoanCard /> */}</div>
        </div>
    );
};

export default LoansListDisplay;

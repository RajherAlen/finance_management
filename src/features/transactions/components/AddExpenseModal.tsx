import React, { useState } from 'react';

import Button from 'src/components/button/Button';
import Modal from 'src/components/dialog/Modal';

import AddExpense from './AddExpense';

const AddExpenseModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex justify-end">
            <Modal
                title="Add your expenses"
                triggerAsChild
                className="min-w-[660px]"
                open={isOpen}
                onOpenChange={setIsOpen}
                trigger={
                    <Button size="lg" variant="outline">
                        Add new transaction
                    </Button>
                }
            >
                <AddExpense additionalFn={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default AddExpenseModal;

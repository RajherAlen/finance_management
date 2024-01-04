import React, { useState } from 'react';

import Modal from 'src/components/dialog/Modal';

import { Edit } from 'lucide-react';

import AddIncome from './AddIncome';

const AddIncomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal open={isOpen} onOpenChange={setIsOpen} trigger={<Edit width="14" height="14" />}>
            <AddIncome additionalAction={handleCloseModal}  />
        </Modal>
    );
};

export default AddIncomeModal;

import React, { useState } from 'react';

import Modal from 'src/components/dialog/Modal';

import { Edit } from 'lucide-react';

import AddIncome from './AddIncome';
import EditIncome from './EditIncome';

const EditIncomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal open={isOpen} onOpenChange={setIsOpen} trigger={<Edit width="14" height="14" />}>
            <EditIncome additionalAction={handleCloseModal}  />
        </Modal>
    );
};

export default EditIncomeModal;

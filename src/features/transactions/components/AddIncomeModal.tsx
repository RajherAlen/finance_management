import React from "react";
import Modal from "src/components/dialog/Modal";
import { Edit } from "lucide-react";
import AddIncome from "./AddIncome";

const AddIncomeModal = () => {
	return (
		<Modal trigger={<Edit width="14" height="14" />}>
			<AddIncome />
		</Modal>
	);
};

export default AddIncomeModal;

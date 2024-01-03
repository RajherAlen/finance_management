"use client";
import { Edit3Icon } from "lucide-react";
import React, { useState } from "react";
import Card from "src/components/card/Card";
import Modal from "src/components/dialog/Modal";
import { ProgressBar } from "src/components/progress/ProgressBar";
import EditSaving from "src/features/transactions/components/EditSaving";
import { Saving } from "src/features/transactions/model/transactionModel";

const SavingGoalCard = (props: Saving) => {
	const { name, goalAmount, currentlySaved } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};
	return (
		<Card className="mb-4">
			<ProgressBar
				value={currentlySaved}
				label={name}
				total={goalAmount}
				additionalComponent={
					<Modal
						open={isOpen}
						triggerAsChild
						onOpenChange={setIsOpen}
						trigger={
							<Edit3Icon
								width={16}
								height={16}
								cursor="pointer"
							/>
						}
					>
						<EditSaving additionalAction={handleCloseModal} {...props} />
					</Modal>
				}
			/>
		</Card>
	);
};

export default SavingGoalCard;

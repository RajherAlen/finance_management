"use client";
import React, { useState } from "react";
import { useAppSelector } from "src/store/hooks";
import SavingGoalCard from "./SavingGoalCard";
import Button from "src/components/button/Button";
import { PlusCircleIcon } from "lucide-react";
import Modal from "src/components/dialog/Modal";
import AddSaving from "src/features/transactions/components/AddSaving";

const SavingsListDisplay = () => {
	const { savings } = useAppSelector((state) => state.transactionStore);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<div className="max-w-md">
			<div className="flex items-center gap-4 mb-4">
				<p className="font-semibold text-sm text-gray-700">
					Saving Goals
				</p>
				<Modal
					open={isOpen}
					triggerAsChild
					onOpenChange={setIsOpen}
					trigger={
						<Button
							onClick={handleOpenModal}
							variant="outline"
							className="flex items-center gap-2"
							size="sm"
						>
							<PlusCircleIcon
								width={16}
								height={16}
								stroke="#1B2327"
							/>
							Add New saving
						</Button>
					}
				>
					<AddSaving additionalAction={handleCloseModal} />
				</Modal>
			</div>

			{savings.map((saving) => {
				return (
					<div key={saving.id}>
						<SavingGoalCard {...saving} />
					</div>
				);
			})}
		</div>
	);
};

export default SavingsListDisplay;

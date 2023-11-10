import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "./dialog";

interface ModalProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	title?: string;
	description?: string;
}

const Modal = (props: ModalProps) => {
	return (
		<Dialog>
			<DialogTrigger>{props.trigger}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					{props.title && <DialogTitle>{props.title}</DialogTitle>}
					{props.description && (
						<DialogDescription>
							{props.description}
						</DialogDescription>
					)}
				</DialogHeader>

				{props.children}

				{props.footer && <DialogFooter>{props.footer}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;

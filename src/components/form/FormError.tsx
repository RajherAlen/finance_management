import { AlertCircleIcon } from "lucide-react";
import React from "react";

const FormError = ({ message }: { message: string | undefined }) => {
	return (
		<div className="flex gap-1 items-center">
			<AlertCircleIcon width={16} stroke="#ef4444" />
			<p className="text-sm font-medium text-destructive">{message}</p>
		</div>
	);
};

export default FormError;

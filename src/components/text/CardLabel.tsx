import React from "react";

const CardLabel = ({ children }: { children: React.ReactNode }) => {
	return (
		<p className="font-semibold text-xs text-muted uppercase">
			{children}
		</p>
	);
};

export default CardLabel;

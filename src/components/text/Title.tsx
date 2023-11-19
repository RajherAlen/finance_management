import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
	return (
		<p className="font-semibold text-sm text-gray-700 mb-2">{children}</p>
	);
};

export default Title;

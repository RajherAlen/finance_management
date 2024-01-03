import React from "react";
import Image from "next/image";

import FinancialFoundationsIcon from "src/components/icons/financial-foundations-icons.svg";

const FinancialFoundations = () => {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={FinancialFoundationsIcon}
				width={200}
				height={200}
				alt="Picture of the author"
			/>
			<h1 className="text-xl font-bold mt-5 mb-3">
				Financial Foundations
			</h1>
			<p className="text-sm text-muted font-normal text-center">
				Disclose your income sources and enumerate regular expenses for
				a comprehensive financial overview.
			</p>
		</div>
	);
};

export default FinancialFoundations;

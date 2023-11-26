import React from "react";
import Image from "next/image";

import CoinsIcon from "src/components/icons/coins-icon.svg";

const BudgetaryBlueprint = () => {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={CoinsIcon}
				width={200}
				height={200}
				alt="Picture of the author"
			/>
			<h1 className="text-xl font-bold mt-5 mb-3">Budgetary Blueprint</h1>
			<p className="text-sm text-[#A3AEB4] font-normal text-center">
				Engineer a budget by delineating spending limits for distinct
				categories. Tailor your budget to align seamlessly with your
				financial objectives.
			</p>
		</div>
	);
};

export default BudgetaryBlueprint;

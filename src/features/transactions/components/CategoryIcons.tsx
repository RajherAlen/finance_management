import { CarIcon, CoinsIcon, HomeIcon } from "lucide-react";
import React from "react";
import Card from "src/components/card/Card";

interface CategoryIconsProps {
	category: string;
	width?: number;
	height?: number;
}

const CategoryIcons = ({
	category,
	width = 18,
	height = 18
}: CategoryIconsProps) => {
	let transactionIcon;

	const iconSize = {
		width: width,
		height: height,
		stroke: "#1f1f1f"
	};

	switch (category) {
		case "car":
			transactionIcon = <CarIcon {...iconSize} />;
			break;
		case "house":
			transactionIcon = <HomeIcon {...iconSize} />;
			break;
		default:
			transactionIcon = <CoinsIcon {...iconSize} />;
			break;
	}

	return (
		<Card variant="grey" radius="full" size="sml" className="flex items-center justify-center w-[48px] h-[48px]">
			{transactionIcon}
		</Card>
	);
};

export default CategoryIcons;

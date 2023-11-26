import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "src/lib/utils/cn";

const cardVariants = cva("rounded-md", {
	variants: {
		variant: {
			default: "bg-card text-card-foreground shadow-xs",
			grey: "bg-[#EBEBEB]",
			success: "bg-green-500 bg-opacity-10",
			warning: "bg-orange-500 bg-opacity-10",
			error: "bg-red-500 bg-opacity-10",
			info: "bg-sky-500 bg-opacity-10",
			caution: "bg-[#F8F8A0]"
		},
		size: {
			default: "p-3",
			sml: "p-2",
			med: "p-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

interface CardProps extends VariantProps<typeof cardVariants> {
	children: React.ReactNode;
	className?: string;
}

const Card = ({ children, variant, size, className }: CardProps) => {
	return (
		<div className={cn(cardVariants({ variant, size, className }))}>
			{children}
		</div>
	);
};

export default Card;

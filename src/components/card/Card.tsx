import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "src/lib/utils/cn";

const cardVariants = cva("", {
	variants: {
		variant: {
			default: "bg-card text-card-foreground shadow-xs",
			grey: "bg-[#EBEBEB]",
			outline: "bg-transparent border border-border",
			success: "bg-green-500 bg-opacity-10",
			warning: "bg-orange-500 bg-opacity-10",
			error: "bg-red-500 bg-opacity-10",
			info: "bg-sky-500 bg-opacity-10",
			caution: "bg-primary"
		},
		size: {
			default: "p-3",
			sml: "p-2",
			med: "p-4",
			lrg: "p-6",
			xlrg: "p-8",
		},
		radius: {
			sm: "rounded-sm",
			md: "rounded-md",
			xlg: "rounded-2xl"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		radius: "md"
	}
});

interface CardProps extends VariantProps<typeof cardVariants> {
	children: React.ReactNode;
	className?: string;
}

const Card = ({ children, variant, size, radius, className }: CardProps) => {
	return (
		<div className={cn(cardVariants({ variant, radius, size, className }))}>
			{children}
		</div>
	);
};

export default Card;

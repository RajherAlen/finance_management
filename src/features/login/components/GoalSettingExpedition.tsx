import React from "react";
import Image from "next/image";

import GoalIcon from "src/components/icons/goal-icon.svg";

const GoalSettingExpedition = () => {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={GoalIcon}
				width={200}
				height={200}
				alt="Picture of the author"
			/>
			<h1 className="text-xl font-bold mt-5 mb-3">
				Goal Setting Expedition
			</h1>
			<p className="text-sm text-[#A3AEB4] font-normal text-center">
				Articulate your short-term and long-term financial aspirations.
				Specify monetary targets, desired timelines, and prioritize each
				goal accordingly.
			</p>
		</div>
	);
};

export default GoalSettingExpedition;

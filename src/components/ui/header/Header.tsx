import React from "react";
import { Avatar } from "src/components/avatar/Avatar";
import Title from "src/components/text/Title";

const Header = () => {
	return (
		<div className="px-4 py-3">
			<div className="flex justify-end items-center gap-3">
				<Avatar />
				<div>
					<p className="text-sm font-bold text-slate-600">
						Alen Rajher
					</p>
					<p className="text-xs text-gray-400">
						arajher@mono.software
					</p>
				</div>
			</div>

			<div className="border-t mt-3"></div>
		</div>
	);
};

export default Header;

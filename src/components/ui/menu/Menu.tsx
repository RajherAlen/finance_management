import { BarChartBig, LayoutDashboardIcon } from "lucide-react";
import MenuItem from "./MenuItem";

const Menu = () => {
	return (
		<div className="h-screen p-6">
			<div className="w-52 px-4 rounded-lg h-full bg-white">
				<div className="py-5 font-bold">FM</div>

				<div className="border-t py-6">
					<div>
						<MenuItem
							to="/"
							title="Dashboard"
							icon={LayoutDashboardIcon}
						/>
						<MenuItem
							to="/analytics"
							title="Analytics"
							icon={BarChartBig}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;

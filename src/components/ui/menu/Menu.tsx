import { BarChartBig, LayoutDashboardIcon, PiggyBankIcon } from 'lucide-react';

import MenuItem from './MenuItem';

const Menu = () => {
    return (
        <div className="h-screen p-6">
            <div className="h-full w-52 rounded-lg bg-white px-4">
                <div className="py-5 font-bold">FM</div>

                <div className="border-t py-6">
                    <div>
                        <MenuItem to="/" title="Dashboard" icon={LayoutDashboardIcon} />
                        <MenuItem to="/analytics" title="Analytics" icon={BarChartBig} />
                        <MenuItem to="/savings" title="Savings" icon={PiggyBankIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;

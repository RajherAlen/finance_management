import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SvgIconProps {
    width: number;
    className?: string;
}

type SvgIconComponent = React.FC<SvgIconProps>;

interface MenuItemProps {
    icon?: any;
    title: string;
    to: string;
}

const MenuItem = ({ icon: Icon, title, to }: MenuItemProps) => {
    const pathName = usePathname();
    const isActive = pathName === to;

    const isActiveStyle = isActive ? 'text-slate-600 font-bold dark:text-white' : 'font-normal text-slate-400';

    return (
        <Link
            href={to}
            prefetch={true}
            className={clsx(
                'mb-1 flex items-center gap-3 rounded-md p-2 transition-all ease-out hover:bg-slate-100 hover:dark:bg-slate-900',
                isActive ? 'bg-secondary bg-opacity-20' : ''
            )}
        >
            {Icon && <Icon width={18} className={isActiveStyle} />}
            <div className={clsx('text-sm', isActiveStyle)}>{title}</div>
        </Link>
    );
};

export default MenuItem;

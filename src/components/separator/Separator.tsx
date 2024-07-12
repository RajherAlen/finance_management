import React from 'react';

import { cn } from 'src/lib/utils/cn';

const Separator = ({ className }: { className?: string }) => {
    return <div className={cn('my-4 border-t border-slate-200 border-opacity-60', className)}></div>;
};

export default Separator;

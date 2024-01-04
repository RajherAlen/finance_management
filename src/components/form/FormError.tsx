import React from 'react';

import { AlertCircleIcon } from 'lucide-react';

const FormError = ({ message }: { message: string | undefined }) => {
    return (
        <div className="flex items-center gap-1">
            <AlertCircleIcon width={16} stroke="#ef4444" />
            <p className="text-sm font-medium text-destructive">{message}</p>
        </div>
    );
};

export default FormError;

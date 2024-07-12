import React from 'react';

import AddExpense from './AddExpense';
import AddIncome from './AddIncome';

const AddTransaction = ({ type }: { type: string }) => {
    if (type === 'income') {
        return <AddIncome />;
    } else if (type === 'expense') {
        return <AddExpense />;
    }

    return null;
};

export default AddTransaction;

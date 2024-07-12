import React from 'react';

import FinancialFoundationsIcon from 'src/components/icons/financial-foundations-icons.svg';

import Image from 'next/image';

const FinancialFoundations = () => {
    return (
        <div className="flex flex-col items-center">
            <Image src={FinancialFoundationsIcon} width={200} height={200} alt="Picture of the author" />
            <h1 className="mb-3 mt-5 text-xl font-bold">Financial Foundations</h1>
            <p className="text-center text-sm font-normal text-muted">
                Disclose your income sources and enumerate regular expenses for a comprehensive financial overview.
            </p>
        </div>
    );
};

export default FinancialFoundations;

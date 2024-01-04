import React from 'react';

import CoinsIcon from 'src/components/icons/coins-icon.svg';

import Image from 'next/image';

const BudgetaryBlueprint = () => {
    return (
        <div className="flex flex-col items-center">
            <Image src={CoinsIcon} width={200} height={200} alt="Picture of the author" />
            <h1 className="mb-3 mt-5 text-xl font-bold">Budgetary Blueprint</h1>
            <p className="text-center text-sm font-normal text-muted">
                Engineer a budget by delineating spending limits for distinct categories. Tailor your budget to align seamlessly with your
                financial objectives.
            </p>
        </div>
    );
};

export default BudgetaryBlueprint;

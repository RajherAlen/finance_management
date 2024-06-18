import React from 'react';
import Card from 'src/components/card/Card';
import { LoansListDisplay } from 'src/features/loans';


const Loans = () => {
    return (
        <div className="flex h-full items-start gap-10">
            <div className="h-full w-full">
                <LoansListDisplay />
            </div>

            <Card className="text-center">
                <div className="flex gap-5">
                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">You Saved</p>
                        <p className="text-3xl font-bold">Total</p>
                    </div>

                    <div className="border border-l"></div>

                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">Saving Goal</p>
                        <p className="text-3xl font-bold">GOAL</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Loans;

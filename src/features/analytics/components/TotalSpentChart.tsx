import React from 'react';

import CircularChart from 'src/components/charts/CircularChart';

const TotalSpentChart = () => {
    const data = [
        { title: 'Essential', value: 10, color: '#F97939' },
        { title: 'Non-Essential', value: 15, color: '#F8D0A0' },
        { title: 'Savings', value: 20, color: '#4A9285' },
    ];

    return (
        <div>
            <p className="mb-5 text-xl font-semibold">Total Spent</p>

            <div className="flex flex-col items-center justify-center">
                <div className="h-[220px] w-[220px] mb-5">
                    <CircularChart data={data} />
                </div>

                <div className="flex gap-4">
                    {data.map((item) => {
                        return (
                            <div key={item.title} className="flex items-center gap-1">
                                <p className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></p>
                                <p className="text-sm font-medium">{item.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TotalSpentChart;

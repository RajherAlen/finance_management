'use client';

import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface DataProps {
    title: string,
    value: number,
    color: string
}

const CircularChart = ({ data }: { data: DataProps[] }) => {
    return (
        <PieChart
            data={data}
            lineWidth={20}
            // labelPosition={80}
            // labelStyle={{
            //     fontWeight: 'bold',
            //     color: "#fff"
            // }}
            // label={({ x, y, dx, dy, dataEntry }) => (
            //     <text
            //         x={x}
            //         y={y}
            //         dx={dx}
            //         dy={dy}
            //         dominant-baseline="central"
            //         text-anchor="middle"
            //         style={{
            //             fontSize: '5px',
            //             fontFamily: 'sans-serif',
            //         }}
            //     >
            //         {Math.round(dataEntry.percentage) + '%'}
            //     </text>
            // )}
        />
    );
};

export default CircularChart;

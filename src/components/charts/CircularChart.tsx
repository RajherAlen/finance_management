import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface DataProps {
    title: string;
    value: number;
    color: string;
}

const CircularChart = ({ data }: { data: DataProps[] }) => {
    return <PieChart data={data} lineWidth={20} />;
};

export default CircularChart;

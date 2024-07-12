import React from 'react';

// import BubbleChart from '@weknow/react-bubble-chart-d3';

interface DataProps {
    description: string;
    amount: number;
}

const CustomBubbleChart = ({ data }: { data: DataProps[] }) => {
    // return (
    //     <BubbleChart
    //         width={400}
    //         height={400}
    //         graph={{
    //             zoom: 0.8,
    //             offsetX: 0.1,
    //             offsetY: 0.05,
    //         }}
    //         padding={0}
    //         showLegend={false}
    //         fontFamily="Arial"
    //         valueFont={{
    //             family: 'Arial',
    //             size: 14,
    //             color: '#fff',
    //         }}
    //         labelFont={{
    //             family: 'Arial',
    //             size: 10,
    //             color: '#fff',
    //             weight: 'normal',
    //         }}
    //         data={data.map((item) => ({
    //             label: item.description,
    //             value: item.amount,
    //         }))}
    //     />
    // );
};

export default CustomBubbleChart;

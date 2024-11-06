export const calcPercentage = (value: number, totalValue: number) => {
    if (value >= totalValue) {
        return 100;
    }

    return (value / totalValue) * 100;
};

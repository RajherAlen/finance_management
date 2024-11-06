const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getSeriesData = (transactions: Record<string, { wants: number; needs: number; savings: number; loan: number }>) => {
    return Object.keys(transactions).map((monthKey) => {
        const monthIndex = new Date(monthKey + '-01').getMonth();
        return {
            month: months[monthIndex],
            ...transactions[monthKey],
        };
    });
};

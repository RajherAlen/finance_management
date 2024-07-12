export const calculateMonthlySavings = (totalSavingsGoal: number, numberOfMonths: number): number => {
    if (typeof totalSavingsGoal !== 'number' || typeof numberOfMonths !== 'number' || numberOfMonths === 0) {
        return totalSavingsGoal;
    }

    const monthlySavings: number = totalSavingsGoal / numberOfMonths;

    // Round the result to the nearest integer
    return Math.round(monthlySavings);
};

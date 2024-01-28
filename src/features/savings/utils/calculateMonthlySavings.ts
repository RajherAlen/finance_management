export const calculateMonthlySavings = (totalSavingsGoal: number, numberOfMonths: number): number => {
    const monthlySavings: number = totalSavingsGoal / numberOfMonths;

    return +monthlySavings.toFixed();
}
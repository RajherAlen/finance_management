export const checkIsLoanCompleted = ({ startDate, totalInstalments }: { startDate: string | Date; totalInstalments: number }) => {
    const start = new Date(startDate);
    const currentDate = new Date();

    // Calculate the difference in months between startDate and currentDate
    const diffInMonths = (currentDate.getFullYear() - start.getFullYear()) * 12 + (currentDate.getMonth() - start.getMonth());
    // Calculate the current installment
    let currentInstalment = diffInMonths;
    
    if (currentInstalment > totalInstalments) {
        currentInstalment = totalInstalments;
    }
    
    console.log(diffInMonths, totalInstalments, currentInstalment)
    const isCompleted = totalInstalments <= currentInstalment;
    const status = isCompleted ? 'Completed' : 'Ongoing';

    return { isCompleted, status, currentInstalment };
};

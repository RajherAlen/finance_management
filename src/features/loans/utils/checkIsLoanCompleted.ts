import { formatDate } from 'src/lib/utils/formatDate';

export const checkIsLoanCompleted = ({
    startDate,
    totalInstalments,
    endDate,
}: {
    endDate?: string | Date;
    startDate: string | Date;
    totalInstalments: number;
}) => {
    const start = new Date(startDate);
    const currentDate = new Date();

    const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
    const currentDay = formatDate({ date: new Date(), format: 'DD' });

    const loanYear = String(endDate).split('-')[0];
    const loanDay = String(endDate).split('-')[2];

    // Calculate the difference in months between startDate and currentDate
    const diffInMonths = (currentDate.getFullYear() - start.getFullYear()) * 12 + (currentDate.getMonth() - start.getMonth());
    // Calculate the current installment
    let currentInstalment = diffInMonths;
    const isCompleted = currentInstalment >= totalInstalments;

    if (isCompleted) {
        return {
            isCompleted: true,
            status: 'Completed',
            currentInstalment: totalInstalments,
        };
    }

    if (currentYear <= loanYear && currentDay >= loanDay) {
        if (currentInstalment > totalInstalments) {
            currentInstalment = totalInstalments;
        }
        const status = isCompleted ? 'Completed' : 'Ongoing';

        return { isCompleted, status, currentInstalment };
    } else {
        return {
            isCompleted: false,
            status: 'Ongoing',
            currentInstalment: currentInstalment === totalInstalments ? currentInstalment - 1 : currentInstalment,
        };
    }
};

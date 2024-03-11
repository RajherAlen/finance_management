import { formatDate } from 'src/lib/utils/formatDate';

export const calculateSavingDateOfPayment = (date: any) => {
    const today = formatDate({ date: new Date(), format: 'D.MM.YYYY' }).split('.');
    const todayDay = +today[0];
    const todayMonth = +today[1];
    const todayYear = +today[2];

    const savingDate = formatDate({ date: date, format: 'D.MM.YYYY' }).split('.');
    const savingDateDay = +savingDate[0];
    const savingDateMonth = +savingDate[1];
    const savingDateYear = +savingDate[2];

    let untilDate = null;
    let monthsLeft = null;
    let message = '';

    if (todayYear === savingDateYear) {
        if (todayMonth === savingDateMonth) {
            untilDate = savingDateDay - todayDay;
            message = `${untilDate} day${untilDate > 1 ? 's' : ''} left`;
        } else if (todayMonth < savingDateMonth) {
            monthsLeft = savingDateMonth - todayMonth;
            message = `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} left`;
        }
    } else if (todayYear < savingDateYear) {
        const yearsLeft = savingDateYear - todayYear;
        const monthsInYearsLeft = yearsLeft * 12;
        let remainingMonths;
        if (savingDateMonth > todayMonth || (savingDateMonth === todayMonth && savingDateDay >= todayDay)) {
            remainingMonths = savingDateMonth - todayMonth;
        } else {
            remainingMonths = savingDateMonth - todayMonth - 1;
        }

        monthsLeft = remainingMonths + monthsInYearsLeft;

        if (monthsLeft > 12) {
            const remainingYears = Math.floor(monthsLeft / 12);
            const remainingMonthsInYear = monthsLeft % 12;
            message = `${remainingYears} year${remainingYears !== 1 ? 's' : ''} ${remainingMonthsInYear} month${
                remainingMonthsInYear !== 1 ? 's' : ''
            } left`;
        } else {
            message = `${monthsLeft} month${monthsLeft !== 1 ? 's' : ''} left`;
        }
    } else {
        message = 'Payment date has already passed';
    }

    return { message, monthsLeft };
};

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

    if (todayYear === savingDateYear) {
        if (todayMonth === savingDateMonth) {
            untilDate = savingDateDay - todayDay;
            return `${untilDate} day${untilDate > 1 ? 's' : ''} left`;
        } else if (todayMonth < savingDateMonth) {
            const monthsLeft = savingDateMonth - todayMonth;
            return `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} left`;
        }
    } else if (todayYear < savingDateYear) {
        const yearsLeft = savingDateYear - todayYear;
        return `${yearsLeft} year${yearsLeft > 1 ? 's' : ''} left`;
    }

    return 'Payment date has already passed';
};

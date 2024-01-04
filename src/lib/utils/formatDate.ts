import moment from 'moment';

export const formatDate = ({ date, format = 'dd-MM-yyyy' }: { date: Date; format?: string }) => {
    return moment(date).format(format);
};

export const formatFormDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
        // timeZoneName: "short"
    });

    const formatedDate = formatter.format(date).split('/');

    return `${formatedDate[1]}-${formatedDate[0]}-${formatedDate[2]}`;
};

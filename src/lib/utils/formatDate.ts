import moment from 'moment';

export const formatDate = ({date, format = 'dd-MM-yyyy'}: {date: Date, format?: string}) => {
    return moment(date).format(format);
}
import moment from 'moment';

export const formatDate = ({date, format = 'dd-MM-yyyy'}: {date: string, format?: string}) => {
    return moment(date).format(format);
}
import dayjs from "dayjs";

export function dashesToSpaces(str) {
    return str.split('-').join(' ')
}

export function formatDate(dateStr) {
    return dayjs(dateStr).format('D MMM YY');
}
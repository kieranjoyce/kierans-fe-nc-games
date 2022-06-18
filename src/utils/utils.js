import dayjs from "dayjs";
import { getUser, getUsers } from "./api";

export function dashesToSpaces(str) {
    return str.split('-').join(' ')
}

export function formatDate(dateStr) {
    return dayjs(dateStr).format('D MMM YY');
}

export function getCommentAuthors(comments) {
    const commentCount = comments.length;
    switch (commentCount) {
        case 0:
            return [];
        case 1:
            return getUser(comments[0].author);
        default:
            const commentAuthors = comments.map(comment => comment.author)
            return getUsers()
                .then((users) => {
                    return users.filter(({ username }) => commentAuthors.includes(username));
                })
    }
}

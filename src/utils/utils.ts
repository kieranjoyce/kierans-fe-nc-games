import dayjs from "dayjs";
import { getUser, getUsers, Comment } from "./api";

export function dashesToSpaces(str: string) {
    return str.split("-").join(" ");
}

export function formatDate(dateStr: string) {
    return dayjs(dateStr).format("D MMM YY");
}

export function getCommentAuthors(comments: Comment[]) {
    const commentCount = comments.length;
    switch (commentCount) {
        case 0:
            return [];
        case 1:
            return getUser(comments[0].author);
        default:
            const commentAuthors = comments.map((comment) => comment.author);
            return getUsers().then((users) => {
                return users.filter(({ username }) =>
                    commentAuthors.includes(username)
                );
            });
    }
}
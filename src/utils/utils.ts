import dayjs from "dayjs";
import { getUsers } from "./api";
import type { Comment, User } from "../types";

export function dashesToSpaces(str: string) {
    return str.split("-").join(" ");
}

export function formatDate(dateStr: string) {
    return dayjs(dateStr).format("D MMM YY");
}

export function getCommentAuthors(comments: Comment[]) {
    const commentCount = comments.length;
    if (commentCount === 0) {
        return Promise.resolve([] as User[]);
    } else {
        const commentAuthors = comments.map((comment) => comment.author);
        return getUsers().then((users) => {
            return users.filter(({ username }) =>
                commentAuthors.includes(username)
            );
        });
    }
}

export function getUser(targetUsername: string) {
    return getUsers().then((users) => {
        return users.find(({ username }) => username === targetUsername);
    });
}

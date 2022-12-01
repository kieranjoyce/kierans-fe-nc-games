import axios from "axios";
import type { Category, Review, User, Comment } from "../types";

const ncGamesApi = axios.create({
    baseURL: "https://be-yellow-pieces.cyclic.app/api",
});

export function getCategories() {
    return ncGamesApi
        .get<{ categories: Category[] }>("/categories")
        .then(({ data: { categories } }) => {
            return categories;
        });
}

export function getReviews(
    category?: string,
    sort_by?: string,
    order?: string
) {
    return ncGamesApi
        .get<{ reviews: Review[] }>("/reviews", {
            params: { category, sort_by, order },
        })
        .then(({ data: { reviews } }) => {
            return reviews;
        });
}

export function getReview(review_id: string) {
    return ncGamesApi
        .get<{ review: Review }>(`/reviews/${review_id}`)
        .then(({ data: { review } }) => {
            return review;
        });
}

export function getUsers() {
    return ncGamesApi
        .get<{ users: User[] }>("/users")
        .then(({ data: { users } }) => {
            return users;
        });
}

export function patchVotes(review_id: string, inc_votes: number) {
    return ncGamesApi.patch(`/reviews/${review_id}`, { inc_votes });
}

export function getComments(review_id: string) {
    return ncGamesApi
        .get<{ comments: Comment[] }>(`/reviews/${review_id}/comments`)
        .then(({ data: { comments } }) => {
            return comments;
        });
}

export function postComment(review_id: string, username: string, body: string) {
    return ncGamesApi
        .post<{ comment: Comment }>(`/reviews/${review_id}/comments`, {
            username,
            body,
        })
        .then(({ data: { comment } }) => {
            return comment;
        });
}

export function deleteComment(comment_id: number) {
    return ncGamesApi.delete(`/comments/${comment_id}`);
}

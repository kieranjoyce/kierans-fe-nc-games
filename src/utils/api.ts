import axios from "axios";

const ncGamesApi = axios.create({
    baseURL: "https://kierans-be-nc-games.herokuapp.com/api/",
});

export interface Category {
    slug: string;
    description: string;
}

export interface Review {
    review_id: number;
    title: string;
    designer: string;
    owner: string;
    review_img_url: string;
    review_body: string;
    category: string;
    created_at: string;
    votes: number;
    comment_count: number;
}

export interface User {
    username: string;
    name: string;
    avatar_url: string;
}

export interface Comment {
    comment_id: number;
    body: string;
    review_id: number;
    author: string;
    votes: number;
    created_at: string;
}

export function getCategories() {
    return ncGamesApi
        .get<{ categories: Category[] }>("/categories")
        .then(({ data: { categories } }) => {
            return categories;
        });
}

export function getReviews(category: string, sort_by: string, order: string) {
    return ncGamesApi
        .get<{ reviews: Review[] }>("/reviews", {
            params: { category, sort_by, order },
        })
        .then(({ data: { reviews } }) => {
            return reviews;
        });
}

export function getReview(review_id: number) {
    return ncGamesApi
        .get<{ review: Review }>(`/reviews/${review_id}`)
        .then(({ data: { review } }) => {
            return review;
        });
}

export function getUser(targetUsername: string) {
    return ncGamesApi
        .get<{ users: User[] }>("/users")
        .then(({ data: { users } }) => {
            return users.find(({ username }) => username === targetUsername);
        })
        .catch((err) => console.log(err));
}

export function getUsers() {
    return ncGamesApi
        .get<{ users: User[] }>("/users")
        .then(({ data: { users } }) => {
            return users;
        });
}

export function patchVotes(review_id: number, inc_votes: number) {
    return ncGamesApi.patch(`/reviews/${review_id}`, { inc_votes });
}

export function getComments(review_id: number) {
    return ncGamesApi
        .get<{ comments: Comment[] }>(`/reviews/${review_id}/comments`)
        .then(({ data: { comments } }) => {
            return comments;
        });
}

export function postComment(review_id: number, username: string, body: string) {
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
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

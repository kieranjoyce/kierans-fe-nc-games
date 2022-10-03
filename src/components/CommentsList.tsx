import { useEffect, useState } from "react";
import { getComments } from "../utils/api";
import CommentCard from "./CommentCard";
import styles from "../modules/CommentsList.module.css";
import { getCommentAuthors } from "../utils/utils";
import PostComment from "./PostComment";
import type { Comment, User } from "../types";

interface CommentsListProps {
    review_id: string;
    comment_count: number;
}

export default function CommentsList({
    review_id,
    comment_count,
}: CommentsListProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    const [authors, setAuthors] = useState<User[]>([]);

    useEffect(() => {
        getComments(review_id)
            .then((comments) => {
                setComments(comments);
                return getCommentAuthors(comments);
            })
            .then((authors) => {
                if (authors) {
                    setAuthors(authors);
                }
            });
    }, [review_id]);

    return (
        <section>
            <h2>Comments {comment_count}</h2>
            <ul className={styles.list}>
                {comments.map((comment) => {
                    const commentAuthor = authors.find(
                        ({ username }) => username === comment.author
                    );
                    if (commentAuthor) {
                        return (
                            <CommentCard
                                key={comment.comment_id}
                                comment={comment}
                                author={commentAuthor}
                                setComments={setComments}
                            />
                        );
                    }
                    return (
                        <p>an error has occurred, please refresh the page</p>
                    );
                })}
            </ul>
            <PostComment review_id={review_id} setComments={setComments} />
        </section>
    );
}

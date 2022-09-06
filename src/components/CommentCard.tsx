import { formatDate } from "../utils/utils";
import styles from "../modules/CommentCard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils/api";
import type { Comment, User } from "../types";

interface CommentCardProps {
    comment: Comment;
    author: User;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function CommentCard({
    comment: { comment_id, author: commentAuthor, body, votes, created_at },
    author,
    setComments,
}: CommentCardProps) {
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    const { username }: User = useContext(UserContext);

    const onClick = () => {
        setDeleteDisabled(true);
        deleteComment(comment_id).then(() => {
            setDeleteDisabled(false);
            setComments((currComments) => {
                return currComments.filter(
                    (comment) => comment.comment_id !== comment_id
                );
            });
        });
    };

    return (
        <li className={styles.comment}>
            <div className={styles.ownerDetails}>
                {!author ? null : (
                    <div className={styles.avatarContainer}>
                        <img
                            src={author.avatar_url}
                            alt={author.username}
                            className={styles.avatar}
                        />
                    </div>
                )}
                <div className={styles.author}>
                    <p className={styles.username}>{commentAuthor}</p>
                </div>
                <p className={styles.date}>{formatDate(created_at)}</p>
            </div>
            <p>{votes} votes</p>
            <p>{body}</p>
            {commentAuthor === username ? (
                <button
                    type="button"
                    onClick={onClick}
                    disabled={deleteDisabled}
                >
                    delete
                </button>
            ) : null}
        </li>
    );
}

import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../modules/CommentCard.module.css";
import { postComment } from "../utils/api";

function PostComment({ review_id, setComments }) {
    const [commentBody, setCommentBody] = useState("");
    const [isErr, setIsErr] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { username, avatar_url } = useContext(UserContext);

    const onChange = (event) => {
        if (isErr) setIsErr(false);
        setCommentBody(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!commentBody) {
            setIsErr(true);
            return;
        }

        setIsDisabled(true);
        postComment(review_id, username, commentBody)
            .then((newComment) => {
                setComments((currComments) => {
                    return [...currComments, newComment];
                });
                setIsDisabled(false);
                setCommentBody("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form className={styles.comment} onSubmit={onSubmit}>
            <div className={styles.ownerDetails}>
                <div className={styles.avatarContainer}>
                    <img
                        src={avatar_url}
                        alt={username}
                        className={styles.avatar}
                    />
                </div>
                <div className={styles.author}>
                    <p className={styles.username}>{username}</p>
                </div>
            </div>
            <label>
                Add your comment:
                <input
                    style={isErr ? { borderColor: "red" } : null}
                    type="text"
                    value={commentBody}
                    placeholder="Enter comment here"
                    onChange={onChange}
                />
            </label>
            <button type="submit" disabled={isDisabled}>
                Post
            </button>
            {isErr ? <p>❌Comment body must not be empty</p> : null}
        </form>
    );
}

export default PostComment;

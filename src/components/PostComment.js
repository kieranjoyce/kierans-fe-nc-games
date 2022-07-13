import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../modules/CommentCard.module.css";

function PostComment() {
    const [commentBody, setCommentBody] = useState("");
    const [isErr, setIsErr] = useState(false);

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

        // post comment to api
        // disable post button until comment successfully posted
        // display newly added comment (new request or manually add from frontend?), will need setComments in props
        // set new comment body back to empty
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
            <button type="submit">Post</button>
            {isErr ? <p>❌Comment body must not be empty</p> : null}
        </form>
    );
}

export default PostComment;

import { formatDate } from "../utils/utils";
import styles from "../modules/CommentCard.module.css"

export default function CommentCard({ comment : {author: username, body, votes, created_at}, author }) {
    return (
        <li className={styles.comment}>
            <div className={styles.ownerDetails} >
                {!author ? null : 
                    <div className={styles.avatarContainer}>
                        <img src={author.avatar_url} alt={author} className={styles.avatar} />
                    </div>
                }
                <div className={styles.author}>
                    <p className={styles.username}>{username}</p>
                </div>
                <p className={styles.date}>{formatDate(created_at)}</p>
            </div>
            <p>votes: {votes}</p>
            <p>{body}</p>
        </li>

        )
    }
    
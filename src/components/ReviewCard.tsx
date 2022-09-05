import { Link } from "react-router-dom";
import styles from "../modules/ReviewCard.module.css";
import { dashesToSpaces, formatDate } from "../utils/utils";
import { Review } from "../types";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const {
        review_id,
        title,
        designer,
        owner,
        review_img_url,
        review_body,
        category,
        created_at,
        votes,
        comment_count,
    } = review;

    return (
        <li className={styles.review}>
            <Link to={`/reviews/${review_id}`}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.detailsWrapper}>
                    <img
                        src={review_img_url}
                        alt={title}
                        className={styles.image}
                    />
                    <div className={styles.reviewDetails}>
                        <p className={styles.owner}>{owner}</p>
                        <p className={styles.date}>{formatDate(created_at)}</p>
                    </div>
                </div>
                <div className={styles.gameDetails}>
                    <p>{dashesToSpaces(category)}</p>
                    <p>
                        designed by<span>{designer}</span>
                    </p>
                </div>
                <p className={styles.body}>{review_body}</p>
                <div className={styles.engagement}>
                    <p>votes: {votes}</p>
                    <p>comments: {comment_count}</p>
                </div>
            </Link>
        </li>
    );
}

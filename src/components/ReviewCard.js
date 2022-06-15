import dayjs from "dayjs";
import styles from '../modules/ReviewCard.module.css'

export default function ReviewCard({ review }) {
    const {review_id, title, designer, owner, review_img_url, review_body, category, created_at, votes, comment_count} = review;
    
    return (
        <li key={review_id} className={styles.review}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.detailsWrapper}>
                <img src={review_img_url} alt={title} 
                className={styles.image} />
                <div className={styles.reviewDetails}>
                    <p className={styles.owner}>{owner}</p>
                    <p className={styles.date}>{dayjs(created_at).format('D MMM YY')}</p>
                </div>
            </div>
            <div className={styles.gameDetails}>
                <p className={styles.category}>{category.split('-').join(' ')}</p>
                <p>designed by<span>{designer}</span></p>
            </div>
            <p className={styles.body}>{review_body}</p>
            <div className={styles.engagement}>
                <p>votes: {votes}</p>
                <p>comments: {comment_count}</p>
            </div>
        </li>
        
    )
}
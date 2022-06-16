import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getReview, getUser } from "../utils/api";
import { formatDate } from "../utils/utils";
import styles from "../modules/SingleReview.module.css"

export default function SingleReview() {
    const [reviewData, setReviewData] = useState({review: {}, user: {}});
    
    const {title, designer, owner, review_img_url, review_body, category, created_at, votes, comment_count} = reviewData.review;
    const { name, avatar_url } = reviewData.user;
    
    const [isLoading, setIsLoading] = useState(true);
    
    const { review_id } = useParams();
    
    useEffect(() => {
        const reviewPromise = getReview(review_id);
        const userPromise = reviewPromise.then((review => {
            return getUser(review.owner)
        }))
                
        Promise.all([reviewPromise, userPromise])
        .then(([review, user]) => {
            setReviewData({ review, user});
            setIsLoading(false);
        })
    }, [review_id, owner])

    
    if(isLoading) return <p>loading...</p>
    
    return (
        <main>
            <section className={styles.review}>
                <div className={styles.reviewHeader} >
                    <p className={styles.votes}>votes: {votes}</p>
                    <h2 className={styles.title} >{title}</h2>
                </div>
                <div className={styles.ownerDetails} >
                    <div className={styles.avatarContainer}>
                        <img src={avatar_url} alt={owner} className={styles.avatar} />
                    </div>
                    <div className={styles.owner}>
                        <p className={styles.username}>{owner}</p>
                        <p className={styles.ownerName} >{name}</p>
                    </div>
                    <p className={styles.date}>{formatDate(created_at)}</p>
                </div>
                <div>
                    <img src={review_img_url} alt={title} className={styles.image} />
                    <p>designed by {designer}</p>
                    <p>{category}</p>
                </div>
                <p className={styles.body}>{review_body}</p>
            </section>
            <section>
                <p>{comment_count}</p> 
                <p>comments here!</p>
            </section>
        </main>
    )
}
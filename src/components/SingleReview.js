import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getReview, getUser } from "../utils/api";
import { formatDate } from "../utils/utils";
import styles from "../modules/SingleReview.module.css"
import VoteBlock from "./VoteBlock";
import CommentsList from "./CommentsList";

export default function SingleReview() {
    const [reviewData, setReviewData] = useState({review: {}, user: {}});
    
    const {title, designer, owner, review_img_url, review_body, category, created_at, votes, comment_count} = reviewData.review;
    const { name, avatar_url } = reviewData.user;
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [isErr, setIsErr] = useState(false);
    
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
    
    if(isErr) return <p>an error has occurred, please refresh the page</p>
    
    return (
        <main>
            <section className={styles.review}>
                <div className={styles.reviewHeader} >
                    <VoteBlock className={styles.votes} votes={votes} review_id={review_id} setIsErr={setIsErr} />
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
                <img src={review_img_url} alt={title} className={styles.image} />
                <div className={styles.reviewContent} >
                    <div className={styles.gameDetails} >
                        <p>designed by {designer}</p>
                        <p>{category}</p>
                    </div>
                    <p className={styles.body}>{review_body}</p>
                </div>
            </section>
            <section> 
                <CommentsList review_id={review_id} comment_count={comment_count} />
            </section>
        </main>
    )
}

import ReviewCard from "./ReviewCard"
import styles from "../modules/ReviewsList.module.css"
import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";

export default function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        getReviews()
        .then(reviews => {
            setReviews(reviews);
        })
    }, [])
    
    return (
        <main className={styles.main}>
            <h2 className={styles.main__header}>
                Reviews
            </h2>
            <ul className={styles.main__list}>
            {reviews.map(review => {
                return <ReviewCard review={review} />
            })}
            </ul>
        </main>
        
    )
}
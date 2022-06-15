import ReviewCard from "./ReviewCard"
import styles from "../modules/ReviewsList.module.css"
import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    
    const {category} = useParams()
    
    useEffect(() => {
        getReviews(category)
        .then(reviews => {
            setReviews(reviews);
        })
    }, [category])
    
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
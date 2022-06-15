import ReviewCard from "./ReviewCard"
import styles from "../modules/ReviewsList.module.css"
import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dashesToSpaces } from "../utils/utils";

export default function ReviewsList({categories}) {
    const [reviews, setReviews] = useState([]);
    
    const {category} = useParams()
    
    const description = categories && categories.length ? categories.find(({slug}) => slug === category).description : null;
    
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
            {category ? <div>
                <h3 
                className={styles.main__categoryDescription}>
                <span>{dashesToSpaces(category)}</span>: {description}
            </h3> <Link to='/'>Back to all reviews</Link> 
            </div> : null}
            <ul className={styles.main__list}>
            {reviews.map(review => {
                return <ReviewCard key={review.review_id} review={review} />
            })}
            </ul>
        </main>
        
    )
}
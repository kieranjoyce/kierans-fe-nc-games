import ReviewCard from "./ReviewCard"

export default function ReviewsList({ reviews }) {
    
    return (
        <ul>
            {reviews.map(review => {
                return <li key={review.review_id}>
                    <ReviewCard review={review} />
                </li>
            })}
        </ul>
    )
}
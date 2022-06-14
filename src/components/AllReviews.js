import { useEffect, useState } from "react"
import { getReviews } from "../utils/api";
import ReviewsList from "./ReviewsList";

export default function AllReviews() {
    const [allReviews, setAllReviews] = useState([]);
    
    useEffect(() => {
        getReviews()
        .then(reviews => {
            setAllReviews(reviews);
        })
    }, [])
    
    return (
        <main>
            <h2>Reviews</h2>
            <ReviewsList reviews={allReviews} />
        </main>
    )
}
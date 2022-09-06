import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview, getUser } from "../utils/api";
import { formatDate } from "../utils/utils";
import styles from "../modules/SingleReview.module.css";
import VoteBlock from "./VoteBlock";
import CommentsList from "./CommentsList";
import type { Review, User } from "../types";

interface ReviewData {
    review?: Review;
    user?: User;
}

export default function SingleReview() {
    const [reviewData, setReviewData] = useState<ReviewData>({});

    const [isLoading, setIsLoading] = useState(true);

    const [isErr, setIsErr] = useState(false);

    const [isWrongPath, setIsWrongPath] = useState(false);

    const { review_id } = useParams();

    useEffect(() => {
        const reviewPromise =
            typeof review_id === "string" ? getReview(review_id) : undefined;

        const userPromise = reviewPromise?.then((review) => {
            return getUser(review.owner);
        });

        Promise.all([reviewPromise, userPromise])
            .then(([review, user]) => {
                setReviewData({ review, user });
                setIsLoading(false);
            })
            .catch(() => {
                setIsWrongPath(true);
            });
    }, [review_id]);

    if (isWrongPath) return <h2>review not found</h2>;

    if (isLoading || !reviewData.review || !reviewData.user)
        return <p>loading...</p>;

    if (isErr || typeof review_id !== "string")
        return <p>an error has occurred, please refresh the page</p>;

    if (isWrongPath) return <p></p>;

    const {
        title,
        designer,
        owner,
        review_img_url,
        review_body,
        category,
        created_at,
        votes,
        comment_count,
    } = reviewData.review;
    const { name, avatar_url } = reviewData.user;

    return (
        <main>
            <section className={styles.review}>
                <div className={styles.reviewHeader}>
                    <VoteBlock
                        votes={votes}
                        review_id={review_id}
                        setIsErr={setIsErr}
                    />
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <div className={styles.ownerDetails}>
                    <div className={styles.avatarContainer}>
                        <img
                            src={avatar_url}
                            alt={owner}
                            className={styles.avatar}
                        />
                    </div>
                    <div className={styles.owner}>
                        <p className={styles.username}>{owner}</p>
                        <p className={styles.ownerName}>{name}</p>
                    </div>
                    <p className={styles.date}>
                        {formatDate(created_at as string)}
                    </p>
                </div>
                <img
                    src={review_img_url}
                    alt={title}
                    className={styles.image}
                />
                <div>
                    <div className={styles.gameDetails}>
                        <p>designed by {designer}</p>
                        <p>{category}</p>
                    </div>
                    <p className={styles.body}>{review_body}</p>
                </div>
            </section>
            <section>
                <CommentsList
                    review_id={review_id}
                    comment_count={comment_count}
                />
            </section>
        </main>
    );
}

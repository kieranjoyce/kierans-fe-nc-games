import ReviewCard from "./ReviewCard";
import styles from "../modules/ReviewsList.module.css";
import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { dashesToSpaces } from "../utils/utils";
import { ReactComponent as UpSymbol } from "../assets/arrow_upward_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as DownSymbol } from "../assets/arrow_downward_FILL0_wght400_GRAD0_opsz48.svg";
import { useMemo } from "react";

export default function ReviewsList({ categories }) {
    const [reviews, setReviews] = useState([]);

    const [isWrongPath, setIsWrongpath] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");

    const { category } = useParams();

    const categoryObj = useMemo(() => {
        return categories && categories.length
            ? categories.find(({ slug }) => slug === category)
            : null;
    }, [categories, category]);

    useEffect(() => {
        getReviews(category, sort_by, order)
            .then((reviews) => {
                setReviews(reviews);
            })
            .catch((err) => {
                setIsWrongpath(true);
                console.error(err);
            });
    }, [categories, categoryObj, category, sort_by, order]);

    const onChangeSort = (event) => {
        const newSearchParams = { sort_by: event.target.value };
        if (order) {
            newSearchParams.order = order;
        }
        setSearchParams(newSearchParams);
    };

    const onClickOrder = () => {
        const newOrder = order === "asc" ? "desc" : "asc";
        const newSearchParams = { order: newOrder };
        if (sort_by) {
            newSearchParams.sort_by = sort_by;
        }
        setSearchParams(newSearchParams);
    };

    if (isWrongPath) return <h2>category not found</h2>;

    return (
        <main className={styles.main}>
            <div className={styles.main__headerBox}>
                <h2 className={styles.main__header}>Reviews</h2>
                <label className={styles.main__dropdown}>
                    Sort by
                    <select onChange={onChangeSort} defaultValue="created_at">
                        <option value="created_at">date</option>
                        <option value="comment_count">comment count</option>
                        <option value="votes">votes</option>
                    </select>
                </label>
                <button
                    type="button"
                    title="change sort order"
                    onClick={onClickOrder}
                >
                    {order === "asc" ? <UpSymbol /> : <DownSymbol />}
                </button>
            </div>
            {categoryObj ? (
                <div>
                    <h3 className={styles.main__categoryDescription}>
                        <span>{dashesToSpaces(category)}</span>:{" "}
                        {categoryObj.description}
                    </h3>
                </div>
            ) : null}
            <ul className={styles.main__list}>
                {reviews.map((review) => {
                    return (
                        <ReviewCard key={review.review_id} review={review} />
                    );
                })}
            </ul>
        </main>
    );
}

import ReviewCard from "./ReviewCard";
import styles from "../modules/ReviewsList.module.css";
import { getReviews } from "../utils/api";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { dashesToSpaces } from "../utils/utils";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { Category, Review } from "../types";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography,
} from "@mui/material";

interface ReviewsListProps {
    categories?: Category[];
}

interface NewSearchParams {
    [name: string]: string;
}

export default function ReviewsList({ categories }: ReviewsListProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    const [isWrongPath, setIsWrongpath] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const sort_by = searchParams.get("sort_by") || undefined;
    const order = searchParams.get("order") || undefined;

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

    const onChangeSort = (event: SelectChangeEvent) => {
        const newSearchParams: NewSearchParams = {
            sort_by: event.target.value,
        };
        if (order) {
            newSearchParams.order = order;
        }
        setSearchParams(newSearchParams);
    };

    const onClickOrder = () => {
        const newOrder = order === "asc" ? "desc" : "asc";
        const newSearchParams: NewSearchParams = { order: newOrder };
        if (sort_by) {
            newSearchParams.sort_by = sort_by;
        }
        setSearchParams(newSearchParams);
    };

    if (isWrongPath) return <h2>category not found</h2>;

    return (
        <main className={styles.main}>
            <div className={styles.main__headerBox}>
                <Typography sx={{ flexGrow: 1 }} variant="h2">
                    Reviews
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120, my: "auto" }}>
                    <InputLabel id="sort-by">Sort by</InputLabel>
                    <Select
                        labelId="sort-by"
                        label="Sort by"
                        onChange={onChangeSort}
                        defaultValue="created_at"
                        autoWidth
                    >
                        <MenuItem value="created_at">Date</MenuItem>
                        <MenuItem value="comment_count">Comments</MenuItem>
                        <MenuItem value="votes">Votes</MenuItem>
                    </Select>
                </FormControl>
                <Tooltip sx={{ my: "auto" }} title="Change sort order">
                    <Button variant="text" onClick={onClickOrder}>
                        {order === "asc" ? (
                            <ArrowUpwardIcon />
                        ) : (
                            <ArrowDownwardIcon />
                        )}
                    </Button>
                </Tooltip>
            </div>
            {category && categoryObj ? (
                <Box
                    sx={{
                        m: "1em",
                        border: 1,
                        borderColor: "primary.main",
                        borderRadius: 2,
                        p: "1em",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{ textTransform: "capitalize" }}
                    >
                        {dashesToSpaces(category)}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: "text.secondary" }}
                    >
                        {categoryObj.description}
                    </Typography>
                </Box>
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

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
    Container,
    FormControl,
    Grid,
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

export default function ReviewsList({ categories }: ReviewsListProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    const [isWrongPath, setIsWrongpath] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const sort_by = searchParams.get("sort_by") || undefined;
    const order = searchParams.get("order") || undefined;

    const { category } = useParams();

    const categoryDetails = useMemo(() => {
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
    }, [categories, categoryDetails, category, sort_by, order]);

    const onChangeSort = (event: SelectChangeEvent) => {
        const newSortBy = event.target.value;
        setSearchParams((prev: URLSearchParams) => {
            prev.set("sort_by", newSortBy);
            return prev;
        });
    };

    const onClickOrder = () => {
        const newOrder = order === "asc" ? "desc" : "asc";
        setSearchParams((prev: URLSearchParams) => {
            prev.set("order", newOrder);
            return prev;
        });
    };

    if (isWrongPath) return <h2>category not found</h2>;

    return (
        <main>
            <Container sx={{ maxWidth: { sm: "95%", md: "75%" } }}>
                <Box sx={{ display: { sm: "flex" } }}>
                    <Typography
                        sx={{ flexGrow: 1 }}
                        variant="h3"
                        component="h2"
                    >
                        Reviews
                    </Typography>
                    <FormControl
                        size="small"
                        sx={{ minWidth: 120, my: "auto" }}
                    >
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
                </Box>
                <Box
                    sx={{
                        border: 1,
                        borderColor: "primary.main",
                        borderRadius: 2,
                        mt: "1em",
                        p: "1em",
                    }}
                >
                    {category && categoryDetails ? (
                        <Box sx={{ pb: "1em" }}>
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
                                {categoryDetails.description}
                            </Typography>
                        </Box>
                    ) : null}

                    <Grid
                        container
                        alignItems="stretch"
                        spacing={2}
                        rowSpacing={4}
                    >
                        {reviews.map((review) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    key={review.review_id}
                                >
                                    <ReviewCard review={review} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Container>
        </main>
    );
}

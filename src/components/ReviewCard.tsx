import { Link } from "react-router-dom";
import { dashesToSpaces, formatDate } from "../utils/utils";
import type { Review } from "../types";
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import { CommentOutlined, ThumbUpOutlined } from "@mui/icons-material";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const {
        review_id,
        title,
        owner,
        review_img_url,
        review_body,
        category,
        created_at,
        votes,
        comment_count,
    } = review;

    return (
        <Card sx={{ height: "100%" }}>
            <CardActionArea
                component={Link}
                to={`/reviews/${review_id}`}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardHeader
                    title={title}
                    subheader={
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1">
                                By {owner}
                            </Typography>
                            <Typography variant="subtitle1">|</Typography>
                            <Typography variant="subtitle2">
                                {formatDate(created_at)}
                            </Typography>
                        </Box>
                    }
                    sx={{ width: "100%", flexGrow: 1 }}
                />
                <CardMedia
                    component="img"
                    image={review_img_url}
                    alt={title}
                    height={200}
                    sx={{ overflow: "hidden" }}
                />
                <CardContent>
                    <Typography
                        variant="subtitle1"
                        sx={{ textTransform: "capitalize" }}
                    >
                        {dashesToSpaces(category)}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {review_body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ThumbUpOutlined sx={{ ml: "0.5em" }} />
                    <Typography variant="button" sx={{ mx: "0.5em" }}>
                        {votes}
                    </Typography>
                    <CommentOutlined />
                    <Typography variant="button">{comment_count}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

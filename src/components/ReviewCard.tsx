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
        <Card>
            <CardActionArea component={Link} to={`/reviews/${review_id}`}>
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
                />
                <CardMedia component="img" image={review_img_url} alt={title} />
                <CardContent>
                    <Typography variant="body1">
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
        // <li className={styles.review}>
        //     <Link to={`/reviews/${review_id}`}>
        //         <h3 className={styles.title}>{title}</h3>
        //         <div className={styles.detailsWrapper}>
        //             <img
        //                 src={review_img_url}
        //                 alt={title}
        //                 className={styles.image}
        //             />
        //             <div className={styles.reviewDetails}>
        //                 <p className={styles.owner}>{owner}</p>
        //                 <p className={styles.date}>{formatDate(created_at)}</p>
        //             </div>
        //         </div>
        //         <div className={styles.gameDetails}>
        //             <p>{dashesToSpaces(category)}</p>
        //             <p>
        //                 designed by<span>{designer}</span>
        //             </p>
        //         </div>
        //         <p className={styles.body}>{review_body}</p>
        //         <div className={styles.engagement}>
        //             <p>votes: {votes}</p>
        //             <p>comments: {comment_count}</p>
        //         </div>
        //     </Link>
        // </li>
    );
}

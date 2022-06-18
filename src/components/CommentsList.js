import { useEffect, useState } from "react"
import { getComments } from "../utils/api"
import CommentCard from "./CommentCard"
import styles from "../modules/CommentsList.module.css"
import { getCommentAuthors } from "../utils/utils";

export default function CommentsList( {review_id, comment_count} ) {
    const [comments, setComments] = useState([]);
    
    const [authors, setAuthors] = useState([]);
    
    useEffect(() => {
        getComments(review_id)
        .then((comments) => {
            setComments(comments);
            return getCommentAuthors(comments);
        })
        .then((authors) => {
            console.log(authors);
            setAuthors(authors);
        })
    }, [review_id])
    
    
    return (
        <section>
        <h2>Comments {comment_count}</h2>
        <ul className={styles.list} >
        {comments.map((comment) => {
            return <CommentCard key={comment.commend_id} comment={comment} author={authors.find(({ username }) => username === comment.author)} />
        })}
        </ul>
        </section>
        
        )
    }
    
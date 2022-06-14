export default function ReviewCard({ review }) {
    const {title, designer, owner, review_img_url, review_body, category, created_at, votes} = review;
    
    return (
        <section>
            <h3>{title}</h3>
            <img src={review_img_url} alt={title} 
            className="ReviewCard__image" />
            <div className="ReviewCard__details">
                <p>{owner}</p>
                <p>{created_at}</p>
                <p>category: {category}</p>
                <p>designer: {designer}</p>
            </div>
        </section>
        
    )
}
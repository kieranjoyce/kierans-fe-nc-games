export default function NavBar({ categories }) {
    return (
        <nav>
            <ul>
                {categories.map((category) => {
                    return <li key={category.slug}>{category.slug}</li>
                })}
            </ul>
        </nav>
    )
}
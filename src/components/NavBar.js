import styles from '../modules/NavBar.module.css'

export default function NavBar({ categories }) {
    return (
        <nav>
            <ul className={styles.nav__list}>
                {categories.map((category) => {
                    return <li key={category.slug}
                        className={styles.nav__listItem}>
                        {category.slug}
                        </li>
                })}
            </ul>
        </nav>
    )
}
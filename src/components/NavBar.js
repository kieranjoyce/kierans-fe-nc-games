import { Link } from 'react-router-dom'
import styles from '../modules/NavBar.module.css'

export default function NavBar({ categories }) {
    return (
        <nav>
            <ul className={styles.nav__list}>
                {categories.map(({slug}) => {
                    return <li key={slug}
                        className={styles.nav__listItem}>
                        <Link to={`/reviews/${slug}`}>
                            {slug.split('-').join(' ')}
                        </Link>
                        </li>
                })}
            </ul>
        </nav>
    )
}
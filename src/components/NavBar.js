import { NavLink } from 'react-router-dom'
import styles from '../modules/NavBar.module.css'
import { dashesToSpaces } from '../utils/utils'

export default function NavBar({ categories }) {

    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__list}>
                {categories.map(({slug}) => {
                    return <li key={slug}
                        className={styles.nav__listItem}>
                        <NavLink to={`/reviews/${slug}`}
                            className={(({ isActive }) => isActive ? styles.nav__activeLink : undefined)} >
                            {dashesToSpaces(slug)}
                        </NavLink>
                        </li>
                })}
            </ul>
        </nav>
    )
}
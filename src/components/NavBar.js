import { NavLink, useLocation } from "react-router-dom";
import styles from "../modules/NavBar.module.css";
import { dashesToSpaces } from "../utils/utils";

export default function NavBar({ categories }) {
    const location = useLocation();
    const atAllReviews = location.pathname === "/";

    return (
        <nav className={styles.nav}>
            <div className={styles.nav__list}>
                {atAllReviews ? null : (
                    <NavLink
                        key="home"
                        to={`/`}
                        className={({ isActive }) =>
                            isActive ? styles.nav__activeLink : undefined
                        }
                    >
                        <li className={styles.nav__listItem}>
                            Back to all reviews
                        </li>
                    </NavLink>
                )}
                {categories.map(({ slug }) => {
                    return (
                        <NavLink
                            to={`/categories/${slug}`}
                            key={slug}
                            className={({ isActive }) =>
                                isActive ? styles.nav__activeLink : undefined
                            }
                        >
                            <li className={styles.nav__listItem}>
                                {dashesToSpaces(slug)}
                            </li>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}

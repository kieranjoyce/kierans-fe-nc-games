import { NavLink, useLocation } from "react-router-dom";
import styles from "../modules/NavBar.module.css";
import { dashesToSpaces } from "../utils/utils";
import { Category } from "../types";

interface NavBarProps {
    categories: Category[];
}

export default function NavBar(props: NavBarProps) {
    const { categories } = props;

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
                            isActive ? styles.nav__activeLink : ""
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
                                isActive ? styles.nav__activeLink : ""
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

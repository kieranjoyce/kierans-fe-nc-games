import { Link } from "react-router-dom";
import styles from "../modules/Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link to="/">Yellow Pieces</Link>
            </h1>
            <p>login</p>
        </header>
    );
}

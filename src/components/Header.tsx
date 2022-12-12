import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../modules/Header.module.css";

export default function Header() {
    return (
        <header>
            <AppBar position="sticky" sx={{ mb: "1rem", py: "0.5rem" }}>
                <Toolbar>
                    <Typography variant="h2" component="h1">
                        <Link to="/">Yellow Pieces logoified pls</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <h1 className={styles.title}>
                <Link to="/">Yellow Pieces</Link>
            </h1>
            <p>login</p> */}
        </header>
    );
}

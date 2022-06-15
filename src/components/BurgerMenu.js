import { NavLink } from "react-router-dom"
import { dashesToSpaces } from "../utils/utils"
import { slide as Menu } from "react-burger-menu"
import styles from "../modules/BurgerMenu.module.css"

export default function BurgerMenu({ categories }) {
    return (
        <Menu className={styles.bm_menu}
            burgerButtonClassName={styles.bm_burger_button}
            burgerBarClassName={ styles.bm_burger_bars }
            crossButtonClassName={styles.bm_cross_button}
            crossClassName={styles.bm_cross}
            menuClassName={styles.bm_menu}
            morphShapeClassName={styles.bm_morph_shape}
            itemListClassName={styles.bm_item_list}
            overlayClassName={styles.bm_overlay} >
                {categories.map(({slug}) => {
                    return (
                        <NavLink key={slug} to={`/reviews/${slug}`}
                            className={styles.bm_item}>
                            {dashesToSpaces(slug)}
                        </NavLink>
                    )
                })}
        </Menu>
    )
}
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

export default function Navbar () {
  return (
    <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <Link to="/">Home</Link>
             </li>
            <li className={styles.navigation__item}>
              <Link to="/products">Productos</Link>
            </li>
        </ul>
    </nav>
  )
}

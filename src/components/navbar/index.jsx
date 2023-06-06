import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import styles from './navbar.module.css'

export default function Navbar () {
  const { logout } = useLogin()
  return (
    <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <Link to="/">Home</Link>
             </li>
            <li className={styles.navigation__item}>
              <Link to="/products">Productos</Link>
            </li>
            <li className={styles.navigation__item}>
              <button onClick={logout}>Cerrar sesión</button>
            </li>
        </ul>
    </nav>
  )
}

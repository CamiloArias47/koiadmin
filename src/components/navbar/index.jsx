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
        <div className={styles['navigation__right-block']}>
          <button>
            <svg className={styles['sandwidch-btn']} data-v-648cf678="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M25 22.5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h18Zm0-7.75c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h18ZM25 7c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h18Z"></path></svg>
          </button>
        </div>
    </nav>
  )
}

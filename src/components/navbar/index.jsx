import { Link } from 'react-router-dom'
import useUserInterfaceStore from '../../store/useUserInterface'
import useActivePage from '../../hooks/useActivePage'
import koiLogo from '../../assets/imgs/logos/koi-bag-big.png'
import routes from '../../routes'
import styles from './navbar.module.css'

export default function Navbar () {
  const updateShowModal = useUserInterfaceStore(state => state.updateShowModal)
  const { isActive } = useActivePage()
  const {
    home,
    products,
    sales
  } = routes

  return (
    <nav className={styles.navigation}>
        <div className={styles['navigation__left-block']}>
          <Link to={home}>
            <img src={koiLogo} alt="Home" width="32" height="32"/>
          </Link>
          <ul className={styles.navigation__list}>
              <li className={styles.navigation__item + ` ${isActive(products) ? styles['navigation__item--active'] : ''}`}>
                <Link to={products}>Productos</Link>
              </li>
              <li className={styles.navigation__item + ` ${isActive(sales) ? styles['navigation__item--active'] : ''}`}>
                <Link to={sales}>ventas</Link>
              </li>
          </ul>
        </div>
        <div className={styles['navigation__right-block']}>
          <button className={styles['sandwidch-btn']} onClick={updateShowModal}>
            <svg className={styles['sandwidch-btn__img']} data-v-648cf678="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M25 22.5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h18Zm0-7.75c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h18ZM25 7c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H7c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h18Z"></path></svg>
          </button>
        </div>
    </nav>
  )
}

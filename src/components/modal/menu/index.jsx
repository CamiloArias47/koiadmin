import { Link } from 'react-router-dom'
import useLogin from '../../../hooks/useLogin'
import useActivePage from '../../../hooks/useActivePage'
import useUserInterfaceStore from '../../../store/useUserInterface'
import routes from '../../../routes'
import styles from './menu.module.css'

export default function ModalLeftMenu () {
  const { logout } = useLogin()
  const { isActive } = useActivePage()
  const updateShowModal = useUserInterfaceStore(state => state.updateShowModal)
  const {
    home,
    products,
    sales
  } = routes

  /**
   * Avoid to open modal after logout and then login again
   */
  const handlerLogout = () => {
    updateShowModal()
    logout()
  }

  return (
    <div>
      <ul className={styles.menu__list}>
        <li className={`${isActive(home) ? styles['menu__item--active'] : ''}`}>
          <Link to={home}>Dashboard</Link>
        </li>
        <li className={`${isActive(products) ? styles['menu__item--active'] : ''}`}>
          <Link to={products}>Productos</Link>
        </li>
        <li className={`${isActive(sales) ? styles['menu__item--active'] : ''}`}>
          <Link to={sales}>ventas</Link>
        </li>
        <li>
          <button onClick={handlerLogout}>Cerrar sesión </button>
        </li>
      </ul>
    </div>
  )
}

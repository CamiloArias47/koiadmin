import { Outlet } from 'react-router-dom'
import useUserInterfaceStore from '../../store/useUserInterface'
import Navbar from '../../components/navbar'
import Modal from '../../components/modal'
import useLogin from '../../hooks/useLogin'
import styles from './dashboardlayout.module.css'

export default function DashboardLayout () {
  const { redirectUserLoginStatus } = useLogin()
  const theme = useUserInterfaceStore(state => state.theme)

  redirectUserLoginStatus(null)

  return (
    <div className={theme}>
        <Navbar/>
        <Modal/>
        <main className={styles['main-frame']}>
          <Outlet/>
        </main>
    </div>
  )
}

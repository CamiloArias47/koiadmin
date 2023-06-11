import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Modal from '../../components/modal'
import useLogin from '../../hooks/useLogin'
import styles from './dashboardlayout.module.css'

export default function DashboardLayout () {
  const { redirectUserLoginStatus } = useLogin()

  redirectUserLoginStatus(null)

  return (
    <>
        <Navbar/>
        <Modal/>
        <main className={styles['main-frame']}>
          <Outlet/>
        </main>
    </>
  )
}

import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar'
import useLogin from '../../hooks/useLogin'
import styles from './dashboardlayout.module.css'

export default function DashboardLayout () {
  const { redirectUserLoginStatus } = useLogin()

  redirectUserLoginStatus(null)

  return (
    <>
        <Navbar/>
        <main className={styles['main-frame']}>
          <Outlet/>
        </main>
    </>
  )
}

import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import useLogin from '../hooks/useLogin'

export default function DashboardLayout () {
  const { redirectUserLoginStatus } = useLogin()

  redirectUserLoginStatus(null)

  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}

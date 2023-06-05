import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useUIcontext } from '../context/UIcontext'

export default function DashboardLayout () {
  const { loggedin } = useUIcontext()

  if (!loggedin) return <Navigate to='/login' />

  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}

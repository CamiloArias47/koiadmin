import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import useUser from '../hooks/useUser'

export default function DashboardLayout () {
  const user = useUser()

  if (!user?.loggedin) return <Navigate to='/login' />

  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

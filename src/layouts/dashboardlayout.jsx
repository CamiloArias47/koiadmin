import { Outlet, redirect } from 'react-router-dom'
import Navbar from '../components/navbar'
import useLogin from '../hooks/useLogin'

export default function DashboardLayout () {
  const { verifyIfUserIsLogged } = useLogin()

  verifyIfUserIsLogged(() => {}, () => {
    return redirect('/login')
  })

  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}

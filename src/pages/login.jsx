import useLogin from '../hooks/useLogin'
import { useUIcontext } from '../context/UIcontext'
import { Navigate } from 'react-router-dom'

export default function Login () {
  const { loginGoogle, loginStatus } = useLogin()
  const { loggedin } = useUIcontext()

  if (loggedin) return <Navigate to='/' />

  return (
    <>
      <h1>Login page</h1>
      <button onClick={loginGoogle}>Iniciar sesión con Google</button>
      {
        loginStatus ? 'logeado' : 'no logged yet'
      }
    </>
  )
}

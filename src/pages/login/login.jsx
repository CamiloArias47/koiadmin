import useLogin from '../../hooks/useLogin'
import { useUIcontext } from '../../context/UIcontext'
import { Navigate } from 'react-router-dom'
import { formInput } from '../../styles'
import styles from './styles.module.css'

export default function Login () {
  const { loginGoogle, loginStatus } = useLogin()
  const { loggedin } = useUIcontext()

  console.log({ formInput })

  if (loggedin) return <Navigate to='/' />

  return (
    <main className={styles.main}>
      <h1>Login page</h1>
      <form>
        <input type="email" name="email" id="email" placeholder="Email" className={formInput} required/>
      </form>
      <button onClick={loginGoogle}>Iniciar sesión con Google</button>
      {
        loginStatus ? 'logeado' : 'no logged yet'
      }
    </main>
  )
}

import useLogin from '../../hooks/useLogin'
import { useUIcontext } from '../../context/UIcontext'
import { Navigate } from 'react-router-dom'
import { formInput, form } from '../../styles'
import styles from './styles.module.css'

export default function Login () {
  const { loginGoogle, loginStatus } = useLogin()
  const { loggedin } = useUIcontext()

  if (loggedin) return <Navigate to='/' />

  return (
    <main className={styles.main}>
      <div className={styles['login-box']}>
        <h1 className={styles.title}>Login page</h1>
        <form className={form}>
          <input type="email" name="email" id="email" placeholder="Email" className={formInput} required/>
          <input type="password" name="password" id="password" placeholder="Contraseña" className={formInput} required/>
        </form>
        <button onClick={loginGoogle}>Iniciar sesión con Google</button>
        {
          loginStatus ? 'logeado' : 'no logged yet'
        }
      </div>
    </main>
  )
}

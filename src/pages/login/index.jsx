import useLogin from '../../hooks/useLogin'
import { formInput, form, loginBtn, googleLoging } from '../../styles'
import styles from './styles.module.css'
import googleLogo from '../../imgs/logos/google.svg'

export default function Login () {
  const { loginGoogle, redirectUserLoginStatus } = useLogin()

  redirectUserLoginStatus()

  return (
    <main className={styles.main}>
      <div className={styles['login-box']}>
        <h1 className={styles.title}>Ingreso</h1>
        <form className={form}>
          <input type="email" name="email" id="email" placeholder="Email" className={formInput} required/>
          <input type="password" name="password" id="password" placeholder="Contraseña" className={formInput} required/>
          <button type="submit" className={loginBtn}>Iniciar sesión</button>
        </form>
        <button onClick={loginGoogle} className={googleLoging}>
          Iniciar sesión <img src={googleLogo} alt="Iniciar sesión con Google"/>
        </button>
      </div>
    </main>
  )
}

import useLogin from '../../hooks/useLogin'
import { formInput, form, loginBtn } from '../../styles'
import styles from './styles.module.css'
import googleLogo from '../../imgs/logos/google.svg'
import facebookLogo from '../../imgs/logos/facebook.svg'

export default function Login () {
  const { loginGoogle, redirectUserLoginStatus, login, loginFacebook } = useLogin()

  redirectUserLoginStatus()

  const signIn = e => {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(e.target))
    login(fields)
  }

  return (
    <main className={styles.main}>
      <div className={styles['login-box']}>
        <h2 className={styles.title}>Ingreso</h2>
        <form className={form} onSubmit={signIn}>
          <input type="email" name="email" id="email" placeholder="Email" className={formInput} required/>
          <input type="password" name="password" id="password" placeholder="Contraseña" className={formInput} required/>
          <button type="submit" className={loginBtn}>Iniciar sesión</button>
        </form>

        <div className={styles['btns-container']}>
          <div className={styles['btns-container__text-info']}>
            o Inicia sesión con:
          </div>
          <button onClick={loginGoogle} className={styles['google-logging-btn']}>
            <img src={googleLogo} className={styles['google-logging-img']} alt="Iniciar sesión con Google"/>
          </button>
          <button onClick={loginFacebook} className={styles['facebook-logging-btn']}>
            <img src={facebookLogo} className={styles['facebook-logging-img']} alt="Iniciar sesión con Facebook"/>
          </button>
        </div>
      </div>
    </main>
  )
}

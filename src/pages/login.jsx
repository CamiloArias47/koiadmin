import useLogin from '../hooks/useLogin'
export default function Login () {
  const { loginGoogle, loginStatus } = useLogin()
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

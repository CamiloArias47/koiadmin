import { useState, useEffect } from 'react'
import { firebaseApp } from '../services/public-init-firebase'
import { redirect, useNavigate } from 'react-router-dom'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { getUser } from '../services/firestore/users'

const auth = getAuth(firebaseApp)

interface Uselogin {
  loginGoogle: () => void
  loginFacebook: () => void
  loginStatus: boolean
  userLoginStatus: (logged: (res: boolean) => void) => void
  logout: () => Promise<void>
  redirectUserLoginStatus: (logged?: string, noLogged?: string) => void
  login: ({ email, password }: { email: string, password: string }) => Promise<any>
}

export default function useLogin (): Uselogin {
  const [loginStatus, setLoginStatus] = useState(false)

  const isAdminUser = async (uid: string): Promise<boolean> => {
    console.log({ uid })
    const user = await getUser(uid)
    console.log({ user })
    if (user.admin) return true
    throw new Error('user has not access')
  }

  const login = async ({ email, password }: { email: string, password: string }): Promise<any> => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        return user
      })
      .catch(e => {
        setLoginStatus(false)
      })
  }

  const loginGoogle = (): void => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .catch(e => {
        console.log({ e })
        setLoginStatus(false)
      })
  }

  const loginFacebook = (): void => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .catch(e => {
        setLoginStatus(false)
      })
  }

  const userLoginStatus = (logged: (res: boolean) => void): void => {
    onAuthStateChanged(auth, observerUser => {
      console.log({ observerUser })
      if (observerUser != null) {
        isAdminUser(observerUser.uid)
          .then(() => {
            setLoginStatus(true)
            logged(true)
          })
          .catch(async () => {
            await logout()
            setLoginStatus(false)
            logged(false)
          })
      } else {
        setLoginStatus(false)
        logged(false)
      }
    })
  }

  const redirectUserLoginStatus = (loggedRoute = '/' , noLoggedRoute = '/login'): void => {
    const navigate = useNavigate()
    useEffect(() => {
      userLoginStatus(loginStatus => {
        console.log({ loginStatus })
        let goToUrl = noLoggedRoute
        if (loginStatus) goToUrl = loggedRoute
        navigate(goToUrl)
      })
    }, [])
  }

  const logout = async (): Promise<void> => {
    const auth = getAuth()
    signOut(auth).then(() => {
      redirect('/login')
    }).catch((error) => {
      console.log({ error })
    })
  }

  return {
    login,
    loginGoogle,
    loginFacebook,
    loginStatus,
    userLoginStatus,
    logout,
    redirectUserLoginStatus
  }
}

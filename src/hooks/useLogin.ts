import { useState, useEffect } from 'react'
import { firebaseApp } from '../services/init-firebase'
import { redirect, useNavigate } from 'react-router-dom'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // FacebookAuthProvider
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { getUser } from '../services/firestore/users'

const auth = getAuth(firebaseApp)

interface Uselogin {
  loginGoogle: () => void
  loginStatus: boolean
  userLoginStatus: (logged: (res: boolean) => void) => void
  logout: () => Promise<void>
  redirectUserLoginStatus: (logged: string, noLogged: string) => void
}

export default function useLogin (): Uselogin {
  const [loginStatus, setLoginStatus] = useState(false)

  const isAdminUser = async (uid: string): Promise<boolean> => {
    const user = await getUser(uid)
    if (user.admin) return true
    throw new Error('user has not access')
  }

  const loginGoogle = (): void => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .catch(e => {
        setLoginStatus(false)
      })
  }

  //   const loginFacebook = () =>{
  //     const provider = new FacebookAuthProvider()
  //     return signInWithPopup(auth, provider)
  //   }

  const userLoginStatus = (logged: (res: boolean) => void): void => {
    onAuthStateChanged(auth, observerUser => {
      if (observerUser != null) {
        isAdminUser(observerUser.uid)
          .then(() => { logged(true) })
          .catch(async () => {
            await logout()
            logged(false)
          })
      } else {
        logged(false)
      }
    })
  }

  const redirectUserLoginStatus = (loggedRoute: string = '/', noLoggedRoute: string = '/login'): void => {
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
    loginGoogle,
    loginStatus,
    userLoginStatus,
    logout,
    redirectUserLoginStatus
  }
}

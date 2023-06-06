import { useState, useEffect } from 'react'
import { firebaseApp } from '../services/init-firebase'
import { redirect } from 'react-router-dom'
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
  verifyIfUserIsLogged: (logged: () => void, noLogged: () => void) => void
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

  const verifyIfUserIsLogged = (logged: () => void, noLogged: () => void): void => {
    useEffect(() => {
      userLoginStatus(loginStatus => {
        if (loginStatus) logged()
        else noLogged()
      })
    }, [])
  }

  const logout = async (): Promise<void> => {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('closing...')
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
    verifyIfUserIsLogged
  }
}

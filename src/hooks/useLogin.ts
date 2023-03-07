import { useState } from 'react'
import { firebaseApp } from '../services/init-firebase'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // FacebookAuthProvider
  onAuthStateChanged
} from 'firebase/auth'
import { getUser } from '../services/firestore/users'

const auth = getAuth(firebaseApp)

interface Uselogin {
  loginGoogle: () => void
  loginStatus: boolean
  userLoginStatus: (logged: (res: boolean) => void) => void
}

export default function useLogin (): Uselogin {
  const [loginStatus, setLoginStatus] = useState(false)

  const isAdminUser = async (uid: string): Promise<boolean> => {
    const user = await getUser(uid)
    return user.admin
  }

  const loginGoogle = (): void => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(userCredential => userCredential.user.uid)
      .then(isAdminUser)
      .then(isAdmin => {
        if (isAdmin) {
          setLoginStatus(true)
        } else {
          throw new Error('user has not access')
        }
      })
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
        logged(true)
      } else {
        logged(false)
      }
    })
  }

  return {
    loginGoogle, loginStatus, userLoginStatus
  }
}

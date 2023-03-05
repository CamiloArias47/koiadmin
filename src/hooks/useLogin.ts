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
  userLoginStatus: () => void
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
          console.log('user logged succesfuly')
        } else {
          throw new Error('user has not access')
        }
      })
      .catch(e => {
        setLoginStatus(false)
        console.log(e)
      })
  }

  //   const loginFacebook = () =>{
  //     const provider = new FacebookAuthProvider()
  //     return signInWithPopup(auth, provider)
  //   }

  const userLoginStatus = (): void => {
    onAuthStateChanged(auth, observerUser => {
      if (observerUser != null) {
        console.log('se logeo un usuario...')
      }
    })
  }

  return {
    loginGoogle, loginStatus, userLoginStatus
  }
}

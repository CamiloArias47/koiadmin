import db from '../init-db'
import { doc, getDoc } from 'firebase/firestore'
import type User from './user-model'

export const getUser = async (uid: string): Promise<User> => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const user = docSnap.data()
    const {
      admin,
      email,
      emailVerified,
      name,
      phoneNumber,
      photoURL,
      ucedula
    } = user

    const mapedUser: User = {
      admin,
      email,
      emailVerified,
      name,
      phoneNumber,
      photoURL,
      ucedula
    }

    return mapedUser
  } else {
    return {
      admin: false,
      email: '',
      emailVerified: false,
      name: '',
      phoneNumber: '',
      photoURL: '',
      ucedula: ''
    }
  }
}

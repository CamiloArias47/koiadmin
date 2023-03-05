import { firebaseApp } from '../init-firebase'
import { getFirestore } from 'firebase/firestore'

export default getFirestore(firebaseApp)

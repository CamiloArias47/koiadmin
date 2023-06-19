import { firebaseApp } from '../public-init-firebase'
import { getFirestore } from 'firebase/firestore'

export default getFirestore(firebaseApp)

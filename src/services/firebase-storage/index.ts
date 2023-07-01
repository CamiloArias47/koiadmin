import { firebaseApp } from '../public-init-firebase'
import { getStorage } from 'firebase/storage'
const storage = getStorage(firebaseApp)
export default storage

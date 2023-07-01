import storage from '../services/firebase-storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function useUploadImg (file: File, storageFolder: string): void {
  const metadata = {
    contentType: 'image/jpeg',
    type: file.type
  }

  const storageRef = ref(storage, storageFolder + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  uploadTask.on('state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      progress = Math.floor(progress)
      console.log('Upload is ' + progress.toString() + '% done')

      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      console.log({ error: error.code })
    },
    () => {
      void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
      })
    }
  )
}

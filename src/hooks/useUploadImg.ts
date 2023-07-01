import { useState } from 'react'
import storage from '../services/firebase-storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

interface useUploadImgType {
  totalProgress: string
  loadImage: (file: File, storageFolder: string) => void
}

export default function useUploadImg (): useUploadImgType {
  const [totalProgress, setTotalProgress] = useState('0')

  const loadImage = (file: File, storageFolder: string): void => {
    const metadata = {
      contentType: 'image/jpeg',
      type: file.type
    }

    const storageRef = ref(storage, storageFolder + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on('state_changed',
      (snapshot) => {
        let progress: number | string = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        progress = Math.floor(progress)
        progress = progress.toString()
        setTotalProgress(progress)

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

  return { totalProgress, loadImage }
}

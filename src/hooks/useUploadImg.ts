import { useState, useRef } from 'react'
import storage from '../services/firebase-storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

interface useUploadImgType {
  totalProgress: string
  loadImage: (file: File, storageFolder: string, onImageUploaded: (downloadURL: string) => void) => void
  createCrop: (imgName: string, previewCanvasRef: React.RefObject<HTMLCanvasElement>, cb: (file: File) => void) => void
}

export default function useUploadImg (): useUploadImgType {
  const [totalProgress, setTotalProgress] = useState('0')
  const blobUrlRef = useRef('')

  const loadImage = (file: File, storageFolder: string, onImageUploaded: (downloadURL: string) => void): void => {
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
          onImageUploaded(downloadURL)
        })
      }
    )
  }

  const createCrop = (imgName: string, previewCanvasRef: React.RefObject<HTMLCanvasElement>, cb: (file: File) => void): void => {
    if (previewCanvasRef.current == null) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (blob == null) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current.length > 0) {
        URL.revokeObjectURL(blobUrlRef.current)
      }

      blobUrlRef.current = URL.createObjectURL(blob)

      const cropedFile = new File([blob], imgName + '.jpeg', { type: 'image/jpeg' })
      cb(cropedFile)
    })
  }

  return { totalProgress, loadImage, createCrop }
}

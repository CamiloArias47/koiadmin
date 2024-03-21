import { useState, useRef, DOMElement, ReactElement, JSXElementConstructor } from 'react'
import storage from '../services/firebase-storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React from 'react'

interface useUploadImgType {
  totalProgress: string
  imageToUpload: string | undefined
  loadImage: (file: File, imgUrl: string, storageFolder: string) => Promise<string|undefined|null>
  createCrop: (imgName: string, previewCanvasRef: React.RefObject<HTMLCanvasElement>) => Promise<{file:File|null|undefined, dataURL:string}| null>
}

export default function useUploadImg (): useUploadImgType {
  const [totalProgress, setTotalProgress] = useState('0')
  const [imageToUpload, setImageToUpload] = useState<string>()
  const blobUrlRef = useRef('')

  const loadImage = async (file: File, imgUrl: string, storageFolder: string): Promise<string|undefined|null> => {
    const metadata = {
      contentType: 'image/jpeg',
      type: file.type
    }

    const storageRef = ref(storage, storageFolder + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    const downloadURL: string = await new Promise((resolve, reject) => {
      setImageToUpload(imgUrl)
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
          reject(null)
        },
        () => {
          void getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url)
            //onImageUploaded(downloadURL)
          })
        }
      )
    })

    return downloadURL
  }

  const createCrop = async (imgName: string, previewCanvasRef: React.RefObject<HTMLCanvasElement>): Promise<{file:File|null|undefined, dataURL:string}| null> => {
    let file : File | null | undefined
    if (previewCanvasRef.current == null) {
      return null
    }

    const dataURL = previewCanvasRef.current.toDataURL("image/png")
    
    const blob : Blob | null = await new Promise((resolve, reject) => {
      previewCanvasRef?.current?.toBlob((blob) => {
        if (blob == null) reject(null)
        else resolve(blob)
      })
    })

    if (blobUrlRef.current.length > 0) {
      URL.revokeObjectURL(blobUrlRef.current)
    }

    if(blob){
      blobUrlRef.current = URL.createObjectURL(blob)
      const cropedFile = new File([blob], imgName + '.jpeg', { type: 'image/jpeg' })
      file = cropedFile
    } 

    return {file,dataURL}
  }

  return { totalProgress, imageToUpload, loadImage, createCrop }
}

import { useState, useRef, type FormEvent } from 'react'
import useDebounceEffect from '../../../hooks/useDebounceEfect'
import useCanvasPreview from '../../../hooks/useCanvasPreview'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import { InputField, InputBtn } from '../../form-inputs'
import src from '../../../assets/imgs/no-pic.jpeg'
import styles from './addcategory.module.css'
import 'react-image-crop/dist/ReactCrop.css'

export default function AddCategory (): JSX.Element {
  const [imgSrc, setImgSrc] = useState(src)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const blobUrlRef = useRef('')
  const formRef = useRef<HTMLFormElement>(null)
  const subCategories = useRef<string[]>([])
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px',
    x: 145,
    y: 80,
    width: 250,
    height: 250
  })

  useDebounceEffect(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (): Promise<void> => {
      if (
        (completedCrop !== undefined) &&
        (Boolean(completedCrop?.width)) &&
        (Boolean(completedCrop?.height)) &&
        (imgRef.current != null) &&
        (previewCanvasRef.current != null)
      ) {
        void useCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        )
      }
    },
    100,
    [completedCrop]
  )

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null && e.target.files.length > 0) {
      console.log({ value: e.target.value, target: e.target, file: e.target.files[0] })
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() ?? '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const createCrop = (cb: () => void): void => {
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
      console.log({ blob })
      blobUrlRef.current = URL.createObjectURL(blob)

      const cropedFile = new File([blob], 'category-img', { type: 'image/*' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(cropedFile)
      const fileInput = document.createElement('input')
      fileInput.id = 'img-to-upload'
      fileInput.type = 'file'
      fileInput.name = 'archivo'
      fileInput.style.visibility = 'hidden'
      if (fileInput?.files != null) {
        fileInput.files = dataTransfer.files
      }

      if (formRef.current != null) {
        formRef.current.appendChild(fileInput)
        cb()
      }
    })
  }

  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.currentTarget
    createCrop(() => {
      let categoryData = Object.fromEntries(new FormData(form))
      if (subCategories.current !== null && subCategories.current.length > 0) {
        categoryData = { ...categoryData, subcategories: subCategories.current }
        console.log({ categoryData, e })
      } else {
        alert('agrega subcategorias...')
      }
    })
  }

  const getTopics = (topics: string[]): void => {
    subCategories.current = topics
  }

  return (
    <form ref={formRef} onSubmit={handlerSubmit}>
        <h1>Crear categoria</h1>
        <InputField id="category-name" name="category-name" titlename="Nombre Categoria" type="text"/>
        <InputField id="category-image" name="category-image" titlename="Imagen" type="file" onChange={onSelectFile} accept="image/*"/>
        <div className={styles.cropimg}>
          <ReactCrop
            crop={crop}
            onChange={c => { setCrop(c) }}
            onComplete={(c) => { setCompletedCrop(c) }}
            keepSelection
            aspect={1}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              className={styles.cropimg}
            />
          </ReactCrop>
          <canvas
            ref={previewCanvasRef}
            style={{
              display: 'none',
              objectFit: 'contain',
              width: completedCrop?.width,
              height: completedCrop?.height
            }}
          />
        </div>
        <h1>Subcategorias</h1>
        <InputBtn id="subcategory-name" name="subcategory-name" titlename="Nombre" type="text" getTopics={getTopics}/>
        <button type='submit' className={styles['btn-submit']}>Guardar</button>
    </form>
  )
}

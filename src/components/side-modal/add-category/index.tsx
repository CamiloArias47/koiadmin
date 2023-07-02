import { useState, useRef, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { saveCategory } from '../../../services/firestore/categories'
import useUserInterfaceStore from '../../../store/useUserInterface'
import Modal from '../../../components/modal'
import ProgressModal from './progress-modal'
import useDebounceEffect from '../../../hooks/useDebounceEfect'
import useCanvasPreview from '../../../hooks/useCanvasPreview'
import useUploadImg from '../../../hooks/useUploadImg'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import { InputField, InputBtn } from '../../form-inputs'
import src from '../../../assets/imgs/no-pic.jpeg'
import styles from './addcategory.module.css'
import 'react-image-crop/dist/ReactCrop.css'

export default function AddCategory (): JSX.Element {
  const [imgSrc, setImgSrc] = useState(src)
  const [showModal, setShowModal] = useState(false)
  const [categoryCreated, setCategoryCreated] = useState(false)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const blobUrlRef = useRef('')
  const formRef = useRef<HTMLFormElement>(null)
  const subCategories = useRef<string[]>([])
  const [categoryFieldError, setCategoryFieldError] = useState<string>()
  const [subCategoryFieldError, setSubCategoryFieldError] = useState<string>()
  const [imageFieldError, setImageFieldError] = useState<string>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px',
    x: 145,
    y: 80,
    width: 250,
    height: 250
  })
  const { totalProgress, loadImage } = useUploadImg()
  const updateshowSideModal = useUserInterfaceStore(state => state.updateshowSideModal)

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

  const createCrop = (imgName: string, cb: (file: File) => void): void => {
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

  const validateForm = (formData: FormData): boolean => {
    let validForm = true
    const mainImage: File = formData.get('categoryImage') as File
    if (subCategories.current === null || subCategories.current.length === 0) {
      setSubCategoryFieldError('Agrega al menos una subcategoría')
      validForm = false
    }
    if (mainImage === null || mainImage === undefined || mainImage?.size === 0) {
      setImageFieldError('La categoria necesita una imagen')
      validForm = false
    }
    if (formData.get('categoryName') === null || formData.get('categoryName') === '') {
      setCategoryFieldError('Campo requerido')
      validForm = false
    }
    return validForm
  }

  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.currentTarget
    const categoryData = new FormData(form)
    const validForm = validateForm(categoryData)

    if (!validForm) return

    const categoryDataObj = Object.fromEntries(categoryData)
    // ojo validar: si el nombre tienen espacicos cambiarlos por un guion
    let categoryName = categoryDataObj.categoryName as string
    categoryName = categoryName.replaceAll(' ', '-')
    const subcategories = subCategories.current

    createCrop(categoryName, (file) => {
      setShowModal(true)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      loadImage(file, 'categories/', async (photo: string): Promise<void> => {
        saveCategory({
          id: categoryName,
          photo,
          subcategories
        })
          .then(() => {
            setCategoryCreated(true)
            setTimeout(() => {
              updateshowSideModal(false)
            }, 3000)
          })
          .catch(err => {
            console.log({ err })
          })
      })
    })
  }

  const getTopics = (topics: string[]): void => {
    subCategories.current = topics
  }

  return (
    <>
      <form ref={formRef} onSubmit={handlerSubmit}>
          <h1>Crear categoria</h1>
          <InputField id="categoryName" name="categoryName" titlename="Nombre Categoria" type="text" error={categoryFieldError} />
          <InputField id="categoryImage" name="categoryImage" titlename="Imagen" type="file" onChange={onSelectFile} accept="image/*" error={imageFieldError}/>
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
          <h1>Subcategorías</h1>
          <InputBtn id="subcategoryName" name="subcategoryName" titlename="Nombre" type="text" getTopics={getTopics} error={subCategoryFieldError}/>
          <button type='submit' className={styles['btn-submit']}>Guardar</button>
      </form>
      {
        createPortal(
          <Modal
            title="Crear categoria"
            show={showModal}
            onCloseModal={ () => { setShowModal(false) } }
          >
            <ProgressModal
              progress={totalProgress}
              finished={categoryCreated}
            />
          </Modal>,
          document.body
        )
      }
    </>
  )
}

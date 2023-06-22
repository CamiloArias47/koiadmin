import { useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import { InputField } from '../../form-inputs'
import src from '../../../assets/imgs/no-pic.jpeg'
import styles from './addcategory.module.css'
import 'react-image-crop/dist/ReactCrop.css'

export default function AddCategory (): JSX.Element {
  const [imgSrc, setImgSrc] = useState(src)
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() ?? '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <form>
        <h1>Crear categoria</h1>
        <InputField id="category-name" name="category-name" titlename="Nombre Categoria" type="text"/>
        <InputField id="category-image" name="category-image" titlename="Imagen" type="file" onChange={onSelectFile} accept="image/*"/>
        <div className={styles.cropimg}>
          <ReactCrop
            crop={crop}
            onChange={c => { setCrop(c) }}
            keepSelection
            aspect={1}
          >
            <img src={imgSrc} className={styles.cropimg}/>
          </ReactCrop>
        </div>
        <h1>Subcategorias</h1>
        <InputField id="subcategory-name" name="subcategory-name" titlename="Nombre subcategoria" type="text"/>
        <button type='submit' className={styles['btn-submit']}>Guardar</button>
    </form>
  )
}

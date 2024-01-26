import { useState } from 'react'
import useReadFile from '../../../hooks/useReadFile'
import ImageCrop from '../../../components/image-crop'
import { type PixelCrop } from 'react-image-crop'
import src from '../../../assets/imgs/no-pic.jpeg'
import style from './addpictures.module.css'
import dropdragstyles from '../../../pages/products/create/dropanddrag.module.css'

export default function AddImage(){

    const { imgSrc, onSelectFile, quitImage } = useReadFile({srcCustom:src})
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

    const deleteImage = (): void => {
      quitImage(() => setCompletedCrop(undefined))
    }

    return(
        <>
            <div className={style['secondary-pictures']}>
                <div className={dropdragstyles['image-handler']+' '+dropdragstyles['image-handler--secondary']}>
                    <div className={dropdragstyles['image-handler__help-text--secondary']}>
                    <span className={dropdragstyles['image-handler__help-text--secondary']}>Agregar foto</span>
                    </div>
                    <input type='file' name="extraPicture" id="extraPicture" onChange={onSelectFile}/>
                </div>
            </div>
            <ImageCrop 
                src={imgSrc} 
                quitImg={deleteImage}
                setCompletedCrop={setCompletedCrop}
                completedCrop={completedCrop}
                withControls
            />
        </>
    )
}
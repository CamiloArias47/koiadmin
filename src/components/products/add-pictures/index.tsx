import { RefObject, useRef, useState } from 'react'
import useReadFile from '../../../hooks/useReadFile'
import ImageCrop from '../../../components/image-crop'
import { type PixelCrop } from 'react-image-crop'
import src from '../../../assets/imgs/no-pic.jpeg'
import style from './addpictures.module.css'
import btnStyles from '../../../styles/components/buttons/buttons.module.css'
import dropdragstyles from '../../../pages/products/create/dropanddrag.module.css'

interface AddImage {
    previewRef: RefObject<HTMLCanvasElement>
    posPreview: number
    quit: (pos:number) => void
}

export default function AddImage({previewRef, posPreview, quit}: AddImage){

    const { imgSrc, onSelectFile, quitImage } = useReadFile({srcCustom:src})
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [showCroper, setShowCroper] = useState<boolean>(false)

    const deleteImage = (): void => {
      quitImage(() => setCompletedCrop(undefined))
    }

    const toogleCroper = () : void => {
        setShowCroper(!showCroper)
    }

    const imgSelected = imgSrc !== src

    return(
        <>
            { 
                imgSelected ?
                    <ImageCrop 
                        src={imgSrc} 
                        quitImg={deleteImage}
                        setCompletedCrop={setCompletedCrop}
                        completedCrop={completedCrop}
                        cropPreview={previewRef}
                        close={toogleCroper}
                    />
                : <div className={imgSelected ? style['secondary-picture--selected'] : style['secondary-picture']}>
                    <div className={dropdragstyles['image-handler']+' '+dropdragstyles['image-handler--secondary']+' '+style['image-handler']}>
                        <div className={dropdragstyles['image-handler__help-text--secondary']+' '+style['image-handler__help-text--secondary']}>
                            <span className={dropdragstyles['image-handler__help-text--secondary']+' '+style['image-handler__help-text--secondary']}>
                                { imgSelected ? 'Cambiar foto' : 'Seleciona o arrastra una foto' }
                             </span>
                            <input type='file' name="extraPicture" onChange={onSelectFile}/>
                        </div>
                    </div>
                    <button className={style['secondary-picture__close']+' '+btnStyles['cancel-btn']} onClick={()=>{quit(posPreview)}}>Quitar 🗑️</button>
                  </div>
            }
        </>
    )
}
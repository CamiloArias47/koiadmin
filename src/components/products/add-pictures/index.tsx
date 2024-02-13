import { RefObject, useRef, useState } from 'react'
import useReadFile from '../../../hooks/useReadFile'
import ImageCrop from '../../../components/image-crop'
import { type PixelCrop } from 'react-image-crop'
import src from '../../../assets/imgs/no-pic.jpeg'
import style from './addpictures.module.css'
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

    return(
        <>
            <div className={style['secondary-picture']}>
                <div className={dropdragstyles['image-handler']+' '+dropdragstyles['image-handler--secondary']+' '+style['image-handler']}>
                    <div className={dropdragstyles['image-handler__help-text--secondary']+' '+style['image-handler__help-text--secondary']}>
                        <span className={dropdragstyles['image-handler__help-text--secondary']+' '+style['image-handler__help-text--secondary']}>Seleciona una foto</span>
                        <input type='file' name="extraPicture" id="extraPicture" onChange={onSelectFile}/>
                    </div>
                </div>
                <button className={style['secondary-picture__close']} onClick={()=>{quit(posPreview)}}>Cerrar</button>
            </div>
            { 
                imgSrc !== src ?
                    <ImageCrop 
                        src={imgSrc} 
                        quitImg={deleteImage}
                        setCompletedCrop={setCompletedCrop}
                        completedCrop={completedCrop}
                        cropPreview={previewRef}
                        withControls
                        close={toogleCroper}
                    />
                : null
            }
        </>
    )
}
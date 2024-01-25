import { useState, useRef, MouseEventHandler } from 'react'
import useDebounceEffect from '../../hooks/useDebounceEfect'
import useCanvasPreview from '../../hooks/useCanvasPreview'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import srcDefault from '../../assets/imgs/no-pic.jpeg'
import { CloseIcon } from '../../icons'

import style from './imagecrop.module.css'

interface ImageCropInterface {
    quitImg : MouseEventHandler<HTMLButtonElement>
    src? : string
    cropPreview? : React.RefObject<HTMLCanvasElement>
    completedCrop: PixelCrop | undefined
    setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | undefined>>
}

export default function ImageCrop ({src, quitImg, cropPreview, completedCrop, setCompletedCrop} : ImageCropInterface): JSX.Element {
    const imgSrc = src ? src : srcDefault
    const imgRef = useRef<HTMLImageElement>(null)
    //const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
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
            (cropPreview !== undefined && cropPreview.current != null)
          ) {
            void useCanvasPreview(
              imgRef.current,
              cropPreview.current,
              completedCrop
            )
          }
        },
        100,
        [completedCrop]
      )

    return (
      <div className={style['image-croper']}>
        <ReactCrop
          crop={crop}
          onChange={c => { setCrop(c) }}
          onComplete={(c) => { setCompletedCrop(c) }}
          keepSelection
          aspect={1}
          className={style['image-croper__croper']}
        >
          <img
            ref={imgRef}
            src={imgSrc}
            className={style['image-croper__img']}
          />
        </ReactCrop>
        <div className={style['image-croper__cancel']}>
          Cancelar (Seleccionar otra imagen)
          <button className={style['image-croper__cancel-btn']} onClick={quitImg}>
            <CloseIcon width="10"/>
          </button>
        </div>
      </div>
    )
}
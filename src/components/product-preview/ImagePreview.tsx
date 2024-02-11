import { RefObject } from "react"
import styles from './previewstyles.module.css'

export interface canvasPreview {
  pos: number
  ref: RefObject<HTMLCanvasElement>
}

interface imagepreviewType {
  mainPicture?: string
  pics?: string[]
  name?: string
  canvasPreview?: canvasPreview[]
}

export default function ImagePreview ({ mainPicture, pics = [], name = '', canvasPreview = [] }: imagepreviewType): JSX.Element {
  return (
    <div className={styles.preview}>
        <button className={styles.preview__element+" "+ styles.active}>
          <img src={mainPicture}/>
        </button>
        {
          canvasPreview.map(previewref => {
            return <button
                      key={previewref.pos}
                      className={styles.preview__element+" "+ styles.active}
                    >
                      <canvas
                        ref={previewref.ref}
                        style={{ objectFit: 'contain' }}
                      />   
                    </button>
          })
        }
    </div>
  )
}

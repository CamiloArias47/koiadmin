import { RefObject } from "react"
import styles from './previewstyles.module.css'

interface imagepreviewType {
  mainPicture?: string
  pics?: string[]
  name?: string
  canvasPreview?: {pos: number, ref:RefObject<HTMLCanvasElement>}[]
}

export default function ImagePreview ({ pics = [], name = '', canvasPreview = [] }: imagepreviewType): JSX.Element {
  return (
    <div className={styles.preview}>
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

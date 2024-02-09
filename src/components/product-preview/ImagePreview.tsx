import { RefObject } from "react"
import styles from './previewstyles.module.css'

interface imagepreviewType {
  pics?: string[]
  name?: string
  canvasPreview?: RefObject<HTMLCanvasElement>[]
}

export default function ImagePreview ({ pics = [], name = '', canvasPreview = [] }: imagepreviewType): JSX.Element {
  console.log({canvasPreview})
  return (
    <div className={styles.preview}>
        {
          canvasPreview.map((previewref, index) => {
            return <button
                      key={name+'-'+index}
                      className={styles.preview__element+" "+ styles.active}
                    >
                        <span>
                          <canvas
                            ref={previewref}
                            style={{ objectFit: 'contain' }}
                          />
                        </span>
                    </button>
          })
        }
    </div>
  )
}

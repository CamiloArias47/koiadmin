import { RefObject } from "react"

interface imagepreviewType {
  pics?: string[]
  name?: string
  canvasPreview?: RefObject<HTMLCanvasElement>[]
}

export default function ImagePreview ({ pics = [], name = '', canvasPreview = [] }: imagepreviewType): JSX.Element {
  console.log({canvasPreview})
  return (
    <div className='preview'>
        {
          canvasPreview.map((previewref, index) => {
            return <button
                      key={name+'-'+index}
                      className="preview__element active"
                    >
                        <canvas
                          ref={previewref}
                          style={{ objectFit: 'contain' }}
                        />
                    </button>
          })
        }
    </div>
  )
}

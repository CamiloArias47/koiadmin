import { useRef, useState } from 'react'
import Color from './color' 
import style from './colorform.module.css'

interface Kolors {
  id: number,
  element: JSX.Element
}

export interface colorPreview {
  name: string,
  color: string
}

export default function ColorsForm(){

  const [colors, setColors] = useState([<div key={'root-index'}></div>])
  const kolors = useRef<Kolors[]| []>([])
  const [colorsPreview, setColorsPreview] = useState<colorPreview[]>([])

  const addColor = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const totalCOlors = kolors.current[kolors.current.length -1]?.id
    const colorIndex = totalCOlors === undefined ? 0 : totalCOlors+1

    kolors.current = [
      ...kolors.current, 
      {
        id:colorIndex, 
        element: <Color index={colorIndex} key={colorIndex} del={delColor} addColorPreview={addColorPreview}/> 
      }
    ]

    const colorElements = kolors.current.map(color => color.element)

    setColors([...colorElements])
  }

  const delColor = (posBtn:number) => {
    const newColors = kolors.current.filter(color => color.id !== posBtn)
    kolors.current = newColors
    const colorElements = newColors.map(color => color.element)
    setColors([...colorElements])
  }

  const addColorPreview = (posColor:number, newColor:colorPreview) => {
    const colorsPreviewCopy = colorsPreview
    colorsPreviewCopy[posColor] = newColor
    setColorsPreview(colorsPreviewCopy)
  }

  return(
      <div className={style['colors-warpper']}>
        { colors }
        <button 
          className={style['colors__add-btn']}
          onClick={addColor}
        >
          Agregar color
        </button>
      </div>
  )
}
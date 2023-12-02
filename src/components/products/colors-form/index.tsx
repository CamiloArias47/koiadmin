import { useState } from 'react'
import Color from './color' 
import style from './colorform.module.css'

export default function ColorsForm(){

  const [colors, setColors] = useState([<div></div>])

  const addColor = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const totalCOlors = colors.length
    setColors([...colors, <Color key={totalCOlors+1}/>])
  }

  return(
      <div className={style['colors-warpper']}>
        { colors }
        <button 
          className={style['colors__add-btn']}
          onClick={addColor}
        >
          Agegar color
        </button>
      </div>
  )
}
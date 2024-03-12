import { useRef } from 'react'
import { InputField } from '../../form-inputs'
import style from './colorform.module.css'
import {colorPreview} from './index'

interface colorComponent {
    index: number,
    del: (i:number)=>void,
    addColorPreview: (posColor:number, newColor:colorPreview)=>void
}

export default function Color({ index,del, addColorPreview }: colorComponent): JSX.Element {

    const colorName = useRef("")
    const amount = useRef("")
    const color = useRef("")

    const deleteColor = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        del(index)
    }

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target 
        if(name === 'colorName['+index+']') colorName.current = value
        if(name === 'colorAmount['+index+']') amount.current = value
        if(name === 'colors['+index+']') color.current = value
        if(colorName.current !== "" && amount.current !== "" && color.current !== ""){
            addColorPreview(index,{name:colorName.current, color: color.current})
        }
    }

    return(
        <div className={style['colors-warpper__color']}>
            <div className={style['colors__wrap-delete']}>
                <span></span>
                <button className={style['colors__delete']} onClick={deleteColor}>X</button>
            </div>
            <div className={style['colors__inputs']}>
                <InputField 
                    id="colorName" 
                    name={'colorName['+index+']'} 
                    type='text' 
                    titlename='Nombre'
                    onChange={handlerChange} 
                    required
                />
                <InputField 
                    id="colorAmount" 
                    name={'colorAmount['+index+']'} 
                    type='number' 
                    titlename='Cantidad'
                    onChange={handlerChange} 
                    required
                />
                <div className={style.colors__input}>
                    <label 
                        htmlFor='colors' 
                        className={style.colors__label}
                    >
                        Color
                    </label>
                    <input 
                        id="colors"  
                        name={'colors['+index+']'} 
                        className={style.colors__inputcolor} 
                        type='color' 
                        placeholder='Colores'
                        onChange={handlerChange} 
                        required
                    />
                    <span className={style.colors__inputerrors}></span>
                </div>
            </div>
        </div>
    )
}
import { InputField } from '../../form-inputs'
import style from './colorform.module.css'
export default function ColorsForm(){
    return(
        <div className={style['colors-warpper']}>
          <div className={style['colors-warpper__color']}>
            <InputField id="colorName" name='colorName[]' type='text' titlename='Nombre' required/>
            <InputField id="colorAmount" name='colorAmount[]' type='number' titlename='Cantidad' required/>
            <div className={style.colors__input}>
              <label htmlFor='colors' className={style.colors__label}>Color</label>
              <input id="colors"  name='colors[]' className={style.colors__inputcolor} type='color' placeholder='Colores' required/>
              <span className={style.colors__inputerrors}></span>
            </div>
          </div>
          <button 
            className={style['colors__add-btn']}
            onClick={(e)=>{e.preventDefault()}}
          >
            Agegar color
          </button>
        </div>
    )
}
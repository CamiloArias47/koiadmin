import { InputField } from '../../form-inputs'
import style from './colorform.module.css'
export default function ColorsForm(){
    return(
        <div className={style['colors-warpper']}>
          <div className={style['colors-warpper__color']}>
            <InputField id="colorName[]" name='colorName[]' type='text' titlename='Nombre' required/>
            <InputField id="colorAmount[]" name='colorAmount[]' type='number' titlename='Cantidad' required/>
            <InputField id="colors" name='colors' type='color' titlename='Colores' required/>
          </div>
          <button className={style['colors__add-btn']}>Agegar color</button>
        </div>
    )
}
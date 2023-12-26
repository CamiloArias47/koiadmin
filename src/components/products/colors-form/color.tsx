import { InputField } from '../../form-inputs'
import style from './colorform.module.css'
export default function Color(){
    return(
        <div className={style['colors-warpper__color']}>
            <div className={style['colors__wrap-delete']}>
                <span></span>
                <button className={style['colors__delete']}>X</button>
            </div>
            <div className={style['colors__inputs']}>
                <InputField id="colorName" name='colorName[]' type='text' titlename='Nombre' required/>
                <InputField id="colorAmount" name='colorAmount[]' type='number' titlename='Cantidad' required/>
                <div className={style.colors__input}>
                    <label htmlFor='colors' className={style.colors__label}>Color</label>
                    <input id="colors"  name='colors[]' className={style.colors__inputcolor} type='color' placeholder='Colores' required/>
                    <span className={style.colors__inputerrors}></span>
                </div>
            </div>
        </div>
    )
}
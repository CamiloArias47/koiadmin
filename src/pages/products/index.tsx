import style from './products.module.css'

export default function Products (): JSX.Element {
  return (
    <div className={style['product-container']}>
      <div className={style['product-container__main']}>
        <div className={style['product-container__header']}>
            <h1>Productos</h1>
            <button>Agregar producto</button>
        </div>
      </div>
      <div className={style['product-container__aux']}>
        <div className={style.card}>
            Important info about products.
        </div>
      </div>
    </div>
  )
}

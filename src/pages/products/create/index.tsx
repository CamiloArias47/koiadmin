import PageLayout from '../../../layouts/page/pageLayout'
import { InputField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import style from './create.module.css'
import viewDesktop from '../../../assets/imgs/view-desktop.png'

export default function CreateProduct (): JSX.Element {
  const header = <h1>Crear Producto</h1>

  const preview = (
      <div className={style.preview}>
        <h2>Vista previa</h2>
        <img src={viewDesktop} className={style.preview__img}></img>
      </div>
  )

  const form = (
    <Card>
      <form className={style['product-form']}>
        <InputField id="category" name='category' type='text' titlename='Categoria' required/>
        <InputField id="subcategory" name='subcategory' type='text' titlename='Subcategoria' required/>
        <InputField id="name" name='name' type='text' titlename='Nombre' required/>
        <InputField id="price" name='price' type='number' titlename='Precio unitario' required/>
        <InputField id="saleprice" name='saleprice' type='number' titlename='Precio de venta' required/>
        <InputField id="amount" name='amount' type='number' titlename='Cantidad' required/>
        <InputField id="description" name='description' type='text' titlename='Descripción' required/>
        <InputField id="colors" name='colors' type='text' titlename='Colores' required/>
      </form>
    </Card>
  )

  return (
    <PageLayout
      header={header}
      body={preview}
      aux={form}
    />
  )
}

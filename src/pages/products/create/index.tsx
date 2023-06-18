import { useState } from 'react'
import PageLayout from '../../../layouts/page/pageLayout'
import { InputField, SelectField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import ProductPreview from '../../../components/product-preview'
import style from './create.module.css'

export default function CreateProduct (): JSX.Element {
  const [desktopView, setDesktopView] = useState(false)
  const classPreviewDevice = desktopView ? style['card-preview'] : style['card-preview-mobile']

  const header = (
    <div className={style.header}>
      <h1>Crear Producto</h1>
      <div>
        <button
          onClick={ () => { setDesktopView(true) }}
          className={style['btn-desktop']}
        >
          🖥️
        </button>
        <button onClick={ () => { setDesktopView(false) }}>
          📱
        </button>
      </div>
    </div>
  )

  const preview = (
    <Card className={classPreviewDevice}>
      <div className={style.preview}>
        <ProductPreview desktop={desktopView}/>
      </div>
    </Card>
  )

  const form = (
    <Card>
      <form className={style['product-form']}>
        <SelectField id="category" name='category' type='text' titlename='Categoria' required/>
        <SelectField id="subcategory" name='subcategory' type='text' titlename='Subcategoria' required/>
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

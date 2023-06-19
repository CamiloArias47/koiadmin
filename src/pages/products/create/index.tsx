import { useState, useEffect } from 'react'
import useCreateProduct from '../../../store/useCreateProduct'
import { getCategories } from '../../../services/firestore/categories'
import PageLayout from '../../../layouts/page/pageLayout'
import { InputField, SelectField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import ProductPreview from '../../../components/product-preview'
import style from './create.module.css'

export default function CreateProduct (): JSX.Element {
  const [updateCategory, updateSubcategory] = useCreateProduct(state => [state.updateCategory, state.updateSubcategory])
  const [desktopView, setDesktopView] = useState(false)
  const [catOptions, setCatOptions] = useState([{ value: '', name: 'Cargando...' }])
  const classPreviewDevice = desktopView ? style['card-preview'] : style['card-preview-mobile']

  useEffect(() => {
    const getAllCategories = async (): Promise<void> => {
      const categories = await getCategories()
      const catOptions = categories.map(cat => ({ value: cat.id, name: cat.id }))
      setCatOptions(catOptions)
    }
    void getAllCategories()
  }, [])

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

  const handlerCategory = (_: string, cateName: string): void => {
    updateCategory(cateName)
  }

  const handlerSubCategory = (_: string, subcate: string): void => {
    updateSubcategory(subcate)
  }

  const subCatOptions = [
    { value: '', name: '' },
    { value: 'cat1', name: 'Facial' },
    { value: 'cat2', name: 'Labiales' },
    { value: 'cat3', name: 'Uñas' },
    { value: 'cat4', name: 'Ojos' }
  ]

  const form = (
    <Card>
      <form className={style['product-form']}>
        <SelectField id="category" name='category' type='text' titlename='Categoria' options={catOptions} onChange={handlerCategory} required/>
        <SelectField id="subcategory" name='subcategory' type='text' titlename='Subcategoria' options={subCatOptions} onChange={handlerSubCategory} required/>
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

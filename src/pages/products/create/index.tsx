import { useState, useEffect, useRef } from 'react'
import useCreateProduct from '../../../store/useCreateProduct'
import useUserInterfaceStore, { modalSideViews } from '../../../store/useUserInterface'
import { getCategories } from '../../../services/firestore/categories'
import PageLayout from '../../../layouts/page/pageLayout'
import { InputField, SelectField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import ProductPreview from '../../../components/product-preview'
import { AddIcon } from '../../../icons'
import style from './create.module.css'
import type CategoryModelType from '../../../services/firestore/categories/category-model'

export default function CreateProduct (): JSX.Element {
  const emptySubCats = [{ value: '', name: '' }]
  const allcategories = useRef<CategoryModelType[]>([])
  const [updatemodalSideView, updateshowSideModal] = useUserInterfaceStore(state => [state.updatemodalSideView, state.updateshowSideModal])
  const [updateCategory, updateSubcategory] = useCreateProduct(state => [state.updateCategory, state.updateSubcategory])
  const [desktopView, setDesktopView] = useState(false)
  const [catOptions, setCatOptions] = useState<Array<{ value: string | undefined, name: string | undefined }>>([{ value: '', name: 'Cargando...' }])
  const [subCatOptions, setSubCatOptions] = useState<Array<{ value: string | undefined, name: string | undefined }>>(emptySubCats)
  const classPreviewDevice = desktopView ? style['card-preview'] : style['card-preview-mobile']

  useEffect(() => {
    const getAllCategories = async (): Promise<void> => {
      const categories = await getCategories()
      allcategories.current = categories
      let catOptions = categories.map(cat => ({ value: cat.id, name: cat.id?.replaceAll('-', ' ') }))
      catOptions = [emptySubCats[0], ...catOptions]
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

  const handlerCategory = (id: string, cateName: string): void => {
    const subCatOfCatSelected = allcategories.current.find(cat => cat.id === id)
    let subCatOptions = subCatOfCatSelected?.subcategories?.map(sub => ({ value: sub, name: sub.replaceAll('-', ' ') }))
    if (subCatOptions !== undefined) {
      subCatOptions = [emptySubCats[0], ...subCatOptions]
      setSubCatOptions(subCatOptions)
    } else {
      setSubCatOptions(emptySubCats)
    }
    updateSubcategory('')
    updateCategory(cateName)
  }

  const handlerSubCategory = (_: string, subcate: string): void => {
    updateSubcategory(subcate)
  }

  const handlerAddCategory = (e: any): void => {
    e.preventDefault()
    updatemodalSideView(modalSideViews.addCategory)
    updateshowSideModal(true)
  }

  const form = (
    <Card>
      <form className={style['product-form']}>
        <div className={style['product-form__category']}>
          <SelectField id="category" name='category' type='text' titlename='Categoria' options={catOptions} onChange={handlerCategory} required/>
          <button type="button" className={style['product-form__category__btn']} onClick={handlerAddCategory}>
            <AddIcon width="15"/>
          </button>
        </div>
        <SelectField id="subcategory" name='subcategory' type='text' titlename='Subcategoria' options={subCatOptions} onChange={handlerSubCategory} required/>
        <InputField id="name" name='name' type='text' titlename='Nombre' required/>
        <InputField id="price" name='price' type='number' titlename='Precio unitario' required/>
        <InputField id="saleprice" name='saleprice' type='number' titlename='Precio de venta' required/>
        <InputField id="amount" name='amount' type='number' titlename='Cantidad' required/>
        <InputField id="description" name='description' type='text' titlename='Descripción' required/>
        <InputField id="colors" name='colors' type='text' titlename='Colores' required/>
        <button type='submit'>Crear</button>
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

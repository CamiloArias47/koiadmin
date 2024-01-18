import { useState, useEffect, useRef } from 'react'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import useDebounceEffect from '../../../hooks/useDebounceEfect'
import useCanvasPreview from '../../../hooks/useCanvasPreview'
import useStore from '../../../store/useStore'
import useCreateProduct from '../../../store/useCreateProduct'
import Quill from 'quill'
import useUserInterfaceStore, { modalSideViews } from '../../../store/useUserInterface'
import PageLayout from '../../../layouts/page/pageLayout'
import { InputField, SelectField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import ProductPreview from '../../../components/product-preview'
import ColorsForm from '../../../components/products/colors-form'
import { AddIcon, CloseIcon } from '../../../icons'
import { saveProduct } from '../../../services/firestore/products'
import src from '../../../assets/imgs/no-pic.jpeg'
import 'quill/dist/quill.snow.css';
import style from './create.module.css'
import stylesInputs from '../../../components/form-inputs/inputfield.module.css'
import './quill-dark-theme.css'

export default function CreateProduct (): JSX.Element {
  const emptySubCats = [{ value: '', name: '' }]
  const [allcategories, updateCategories] = useStore(state => [state.categories, state.updateCategories])
  const [updatemodalSideView, updateshowSideModal] = useUserInterfaceStore(state => [state.updatemodalSideView, state.updateshowSideModal])
  const [
    updateCategory,
    updateSubcategory,
    updateName,
    updateSalePrice,
    updateDescription
  ] = useCreateProduct(state => [
    state.updateCategory,
    state.updateSubcategory,
    state.updateName,
    state.updateSalePrice,
    state.updateDescription
  ])

  const [desktopView, setDesktopView] = useState(false)
  const [catOptions, setCatOptions] = useState<Array<{ value: string | undefined, name: string | undefined }>>([{ value: '', name: 'Cargando...' }])
  const [subCatOptions, setSubCatOptions] = useState<Array<{ value: string | undefined, name: string | undefined }>>(emptySubCats)
  const classPreviewDevice = desktopView ? style['card-preview'] : style['card-preview-mobile']
  const [imgSrc, setImgSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)
  const imagePreviewRef = useRef<HTMLCanvasElement>(null)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px',
    x: 145,
    y: 80,
    width: 250,
    height: 250
  })

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      await updateCategories()
    }

    const editor = new Quill('#description', {
      theme: 'snow'
    })

    editor.on('text-change', (_, __, source: string) => {
      if (source === 'user') {
        const descriptionBox = document.querySelector('#description .ql-editor')
        const text = { __html: descriptionBox?.innerHTML ?? '' }
        updateDescription(text)
      }
    })

    void getCategories()
  }, [])

  useEffect(() => {
    const getAllCategories = (): void => {
      let catOptions = allcategories.map(cat => ({ value: cat.id, name: cat.name }))
      catOptions = [emptySubCats[0], ...catOptions]
      setCatOptions(catOptions)
    }
    getAllCategories()
  }, [allcategories])

  useDebounceEffect(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (): Promise<void> => {
      if (
        (completedCrop !== undefined) &&
        (Boolean(completedCrop?.width)) &&
        (Boolean(completedCrop?.height)) &&
        (imgRef.current != null) &&
        (imagePreviewRef.current != null)
      ) {
        void useCanvasPreview(
          imgRef.current,
          imagePreviewRef.current,
          completedCrop
        )
      }
    },
    100,
    [completedCrop]
  )

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() ?? '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

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
        <ProductPreview desktop={desktopView} imagePreviewRef={imagePreviewRef} completedCrop={completedCrop}/>
      </div>
    </Card>
  )

  const handlerCategory = (id: string, cateName: string): void => {
    const subCatOfCatSelected = allcategories.find(cat => cat.id === id)
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

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.name
    const value = e.target.value
    if (input === 'name') updateName(value)
    if (input === 'saleprice') {
      const salePrice = value !== '' ? parseInt(value) : 0
      updateSalePrice(salePrice)
    }
  }

  const quitMainImage = (): void => {
    setImgSrc(src)
    setCompletedCrop(undefined)
  }

  const createProduct = (e): void => {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(e.target))
    console.log([fields])
    const colors : {name:string, amount:number, color:string}[] = []
    for(const productIndex in fields){
      const colorAmount = productIndex.indexOf('colorAmount')
      const colorName = productIndex.indexOf('colorName')
      const colorCode = productIndex.indexOf('colors[')
      if(colorAmount >= 0){
        let amountPos : string | number = productIndex.substring(12,13)
        amountPos = parseInt(amountPos)
        colors[amountPos] = {...colors[amountPos] , 'amount' : parseInt(fields[productIndex].toString())}
        delete fields[productIndex]
      }
      if(colorName >= 0){
        let namePos : string | number = productIndex.substring(10,11)
        namePos = parseInt(namePos)
        colors[namePos] = {...colors[namePos] , 'name' : fields[productIndex].toString()}
        delete fields[productIndex]
      }
      if(colorCode >= 0){
        let colorPos : string | number = productIndex.substring(7,8)
        colorPos = parseInt(colorPos)
        colors[colorPos] = {...colors[colorPos] , 'color' : fields[productIndex].toString()}
        delete fields[productIndex]
      }
    }

    fields.colors = colors
    console.log({fields})
    //saveProduct()
  }

  const cropImgHandler = imgSrc === src
    ? <div className={style['image-handler']}>
          <div className={style['image-handler__help-text']}>
            <span className={style['image-handler__help-text--title']}>Imagen principal</span>
            <span>Selecciona o arrastra una imagen</span>
          </div>
          <input type='file' name="mainpic" id="mainpic" onChange={onSelectFile}/>
        </div>
    : <div className={style['image-croper']}>
        <ReactCrop
          crop={crop}
          onChange={c => { setCrop(c) }}
          onComplete={(c) => { setCompletedCrop(c) }}
          keepSelection
          aspect={1}
          className={style['image-croper__croper']}
        >
          <img
            ref={imgRef}
            src={imgSrc}
            className={style['image-croper__img']}
          />
        </ReactCrop>
        <div className={style['image-croper__cancel']}>
          Cancelar (Seleccionar otra imagen)
          <button className={style['image-croper__cancel-btn']} onClick={quitMainImage}>
            <CloseIcon width="10"/>
          </button>
        </div>
      </div>

  const form = (
    <Card>
      <form className={style['product-form']} onSubmit={createProduct}>
        <div className={style['product-form__category']}>
          <SelectField id="category" name='category' type='text' titlename='Categoria' options={catOptions} onChange={handlerCategory} required/>
          <button type="button" className={style['product-form__category__btn']} onClick={handlerAddCategory}>
            <AddIcon width="15"/>
          </button>
        </div>
        <SelectField id="subcategory" name='subcategory' type='text' titlename='Subcategoria' options={subCatOptions} onChange={handlerSubCategory} required/>
        <InputField id="name" name='name' type='text' titlename='Nombre' onChange={handlerInputChange} required/>

        {
          cropImgHandler
        }

        <div className={style['secondary-pictures']}>
          <div className={style['image-handler']+' '+style['image-handler--secondary']}>
            <div className={style['image-handler__help-text--secondary']}>
              <span className={style['image-handler__help-text--secondary']}>Agregar foto</span>
            </div>
            <input type='file' name="extraPicture" id="extraPicture" onChange={onSelectFile}/>
          </div>
        </div>

        <InputField id="price" name='price' type='number' titlename='Precio unitario' min="0" required/>
        <InputField id="saleprice" name='saleprice' type='number' titlename='Precio de venta' onChange={handlerInputChange} min="0" required/>
        <InputField id="amount" name='amount' type='number' titlename='Cantidad' required/>
        <InputField id="expire" name='expire' type='date' titlename='Fecha de vencimiento'/>
        <label
          className={stylesInputs.input__label}
        >
          Descripción
        </label>
        <div id="description" className={style.description}></div>

        <ColorsForm/>

        <button type='submit' className={style['create-product-btn']} >Crear</button>
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

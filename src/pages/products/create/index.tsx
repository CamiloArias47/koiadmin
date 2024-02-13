import { useState, useEffect, useRef, useCallback } from 'react'
import { type PixelCrop } from 'react-image-crop'
import useStore from '../../../store/useStore'
import useCreateProduct from '../../../store/useCreateProduct'
import Quill from 'quill'
import useUserInterfaceStore, { modalSideViews } from '../../../store/useUserInterface'
import PageLayout from '../../../layouts/page/pageLayout'
import { InputField, SelectField } from '../../../components/form-inputs'
import Card from '../../../components/card'
import ProductPreview from '../../../components/product-preview'
import ColorsForm from '../../../components/products/colors-form'
import AddImage from '../../../components/products/add-pictures'
import { canvasPreview } from '../../../components/product-preview/ImagePreview'
import { AddIcon } from '../../../icons'
import { saveProduct } from '../../../services/firestore/products'
import useReadFile from '../../../hooks/useReadFile'
import ImageCrop from '../../../components/image-crop'
import src from '../../../assets/imgs/no-pic.jpeg'
import 'quill/dist/quill.snow.css';
import style from './create.module.css'
import stylesInputs from '../../../components/form-inputs/inputfield.module.css'
import dropdragstyles from './dropanddrag.module.css'
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
  const { imgSrc, onSelectFile, quitImage } = useReadFile({srcCustom:src})
  const imagePreviewRef = useRef<HTMLCanvasElement>(null)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [imgsPreviewRef, setImgsPreviewRef] = useState<canvasPreview[]>([])
  const cropExtraImg = useRef(0)
  const currentCropExtaImgs = useRef(0)
  const [quitAddMorePics, setQuitAddMorePics] = useState(false)
  const imagePreviewRef1 = useRef<HTMLCanvasElement>(null)
  const imagePreviewRef2 = useRef<HTMLCanvasElement>(null)
  const imagePreviewRef3 = useRef<HTMLCanvasElement>(null)
  const imagePreviewRef4 = useRef<HTMLCanvasElement>(null)
  const imagePreviewRef5 = useRef<HTMLCanvasElement>(null)
  const imagesPreviewRef = [
    imagePreviewRef1,
    imagePreviewRef2,
    imagePreviewRef3,
    imagePreviewRef4,
    imagePreviewRef5
  ]


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
        <ProductPreview 
          desktop={desktopView} 
          imagePreviewRef={imagePreviewRef} 
          imagesPreviewRef={imgsPreviewRef}
          completedCrop={completedCrop}
        />
      </div>
    </Card>
  )

  const addImage = useCallback((e) => {
    e.preventDefault()
    const newRef = imagesPreviewRef[currentCropExtaImgs.current]
    setImgsPreviewRef([...imgsPreviewRef, {pos:cropExtraImg.current, ref:newRef}])
    cropExtraImg.current = cropExtraImg.current + 1
    currentCropExtaImgs.current = currentCropExtaImgs.current + 1
    if(currentCropExtaImgs.current === 5) setQuitAddMorePics(true)
  },[cropExtraImg.current])

  const quitExtraImg = (pos: number) => {
    currentCropExtaImgs.current = currentCropExtaImgs.current - 1
    const newPrevElem = imgsPreviewRef.filter(prev => prev.pos !== pos)
    setImgsPreviewRef([...newPrevElem])
    const refToQuit = imagesPreviewRef.splice(pos,1)[0]
    imagesPreviewRef.push(refToQuit)
    if(currentCropExtaImgs.current < 5) setQuitAddMorePics(false)
  }

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

  const deleteImage = (): void => {
    quitImage(() => setCompletedCrop(undefined))
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
    ? <div className={dropdragstyles['image-handler']}>
          <div className={dropdragstyles['image-handler__help-text']}>
            <span className={dropdragstyles['image-handler__help-text--title']}>Imagen principal</span>
            <span>Selecciona o arrastra una imagen</span>
          </div>
          <input type='file' name="mainpic" id="mainpic" onChange={onSelectFile}/>
        </div>
    : <ImageCrop 
        src={imgSrc} 
        quitImg={deleteImage} 
        cropPreview={imagePreviewRef} 
        setCompletedCrop={setCompletedCrop}
        completedCrop={completedCrop}
      />

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
        <div className={style['extra-pictures']}>
          {
            imgsPreviewRef?.map(previeRef => <AddImage 
              key={previeRef.pos} 
              previewRef={previeRef.ref} 
              posPreview={previeRef.pos}
              quit={quitExtraImg}
              /> )
          }
          {
            quitAddMorePics 
              ? null 
              : <button onClick={addImage} className={style['extra-picture__add-btn']}>Agregar imagen</button>
          }
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

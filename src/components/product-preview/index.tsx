import useCreateProduct from '../../store/useCreateProduct'
import ImagePreview from './ImagePreview'
import noPic from '../../assets/imgs/no-pic.jpeg'
import { ShoppingBagIcon, HomeIcon } from '../../icons'
import { formatPrice } from '../../utils'
import { type PixelCrop } from 'react-image-crop'
import styles from './previewstyles.module.css'
import { canvasPreview } from '../product-preview/ImagePreview'
import {colorPreview} from '../products/colors-form'

interface productViewType {
  desktop?: boolean
  mainpicture?: string
  pictures?: string[]
  price?: number | bigint
  descriptionHtml?: { __html: string | TrustedHTML } | undefined
  colors?: colorPreview[]
  imagePreviewRef: React.RefObject<HTMLCanvasElement>
  completedCrop: PixelCrop | undefined
  imagesPreviewRef?: canvasPreview[]
}

export default function ProductPreview ({
  desktop = false,
  mainpicture = noPic,
  pictures = [],
  descriptionHtml = { __html: '<p>Descripción del producto</p>' },
  colors,
  imagePreviewRef,
  imagesPreviewRef = [],
  completedCrop
}: productViewType): JSX.Element {
  const [
    category,
    subcategory,
    name,
    salePrice,
    description
  ] = useCreateProduct(state => [
    state.category, 
    state.subcategory, 
    state.name, 
    state.salePrice,
    state.description
  ])
  const formatedPrice = formatPrice(salePrice)
  const desktopView = desktop ? styles.desktop : ''
  let colorSelector = null

  if (colors != null) {
    colorSelector = colors.map(color => {
      const bgColor = {
        backgroundColor: color?.color
      }
      return (
        <button
          key={color.name + '-' + color.color}
          className={styles['product-colors']}
        >
          <span>{color.name}</span>
          {
            color.color != null
              ? <span className={styles['product-colors__ship']} style={bgColor}></span>
              : null
          }
        </button>
      )
    })
  }

  const previewImgOrCanvas = completedCrop === undefined
    ? <img src={noPic} alt='main image' className={styles.productimg}/>
    : <canvas
        className={styles.productimg}
        ref={imagePreviewRef}
        style={{ objectFit: 'contain' }}
      />

  return (
    <section className={ desktopView + ' ' + styles['product-page-section'] + ' ' + styles.wraper }>
      <ul className={styles.breadcrum}>
        <li>
            <a><HomeIcon width="22" height="22"/></a>
        </li>
        <li>
            <a>{category}</a>
        </li>
        <li>
            <a>{subcategory}</a>
        </li>
      </ul>
      <div className={styles['product-image']}>
            <div className={styles['product-image_main']}>
            {
              previewImgOrCanvas
            }
            </div>
            {
              imagesPreviewRef.length > 0
                ? <ImagePreview 
                    mainPicture={mainpicture}
                    pics={pictures} 
                    name={name} 
                    canvasPreview={imagesPreviewRef}/>
                : ''
            }
      </div>
      <div className={styles['product-details']}>
            <h1 className={styles.h1}>{ name }</h1>
            <span className={styles['product-price']}>{formatedPrice}</span>
            <div className={styles['product-description']} dangerouslySetInnerHTML={description} />
            <form className={styles['form-add']} onSubmit={(e) => { e.preventDefault() }}>
                {
                  (colorSelector != null)
                    ? <div className={styles['form-add__top']}>{colorSelector}</div>
                    : null
                }
                <div className={styles['form-add__bottom']}>
                    <div className={styles['form-group']}>
                        <label htmlFor="cantidad-buy">Cantidad</label>
                        <input
                            type="number"
                            title="cantidad"
                            id="cantidad-buy"
                            className={styles.input + ' ' + styles['input-basic']}
                            min="1"
                            required
                        />
                    </div>
                    <button className={styles.btn + ' ' + styles['btn-primary']}>
                        agregar
                        <ShoppingBagIcon width="32" height="32" color="#fff"/>
                    </button>
                </div>
            </form>
      </div>
    </section>
  )
}

import db from '../init-db'
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import type ProductModelType from './product-model'

const PRODUCTS_COLECCTION: string = 'products'

export const saveProduct = async (product: ProductModelType): Promise<string> => {
  const { 
    amount,
    category,
    subcategory,
    description,
    name,
    photo,
    price,
    cost
  } = product

  const newProduct : ProductModelType = {
    amount,
    category,
    subcategory,
    description,
    name,
    photo,
    price,
    cost,
    timestamp: serverTimestamp()
  }

  if(product.colors) newProduct['colors'] = product.colors
  if(product.pictures) newProduct['pictures'] = product.pictures
  if(product.expire) newProduct['expire'] = product.expire
   
  const prductRef = await addDoc(collection(db, PRODUCTS_COLECCTION), newProduct);

  return prductRef.id
}

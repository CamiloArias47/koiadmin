import db from '../init-db'
import { getDocs, collection, setDoc, doc } from 'firebase/firestore'
import type CategoryModelType from './category-model'

const CATEGORIES_COLECCTION: string = 'categories'

export const getCategories = async (): Promise<CategoryModelType[]> => {
  const querySnapshot = await getDocs(collection(db, CATEGORIES_COLECCTION))
  const categories: CategoryModelType[] = []
  querySnapshot.forEach(doc => {
    const { photo, subcategories } = doc.data()
    categories.push({ id: doc.id, photo, subcategories })
  })
  return categories
}

export const saveCategory = async (category: CategoryModelType): Promise<CategoryModelType> => {
  const { id, photo, subcategories } = category
  const newCategoryRef = doc(db, CATEGORIES_COLECCTION, id)
  await setDoc(newCategoryRef, {
    photo,
    subcategories
  })
  return { id, photo, subcategories }
}

import db from '../init-db'
import { getDocs, collection } from 'firebase/firestore'
import type CategoryModelType from './category-model'

export const getCategories = async (): Promise<CategoryModelType[]> => {
  const querySnapshot = await getDocs(collection(db, 'categories'))
  const categories: CategoryModelType[] = []
  querySnapshot.forEach(doc => {
    categories.push({ ...doc.data(), id: doc.id })
  })
  return categories
}

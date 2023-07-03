import { create } from 'zustand'
import { getCategories } from '../services/firestore/categories'
import type CategoryModelType from '../services/firestore/categories/category-model'

interface StoreTypes {
  categories: CategoryModelType[]
  updateCategories: () => Promise<void>
}

const useStore = create<StoreTypes>(set => ({
  categories: [],
  updateCategories: async () => {
    const categories = await getCategories()
    set(() => ({ categories }))
  }
}))

export default useStore

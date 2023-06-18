import { create } from 'zustand'

interface CreateProductType {
  category: string
  subcategory: string
  updateCategory: (category: string) => void
  updateSubcategory: (subcategory: string) => void
}

const useCreateProduct = create<CreateProductType>(set => ({
  category: 'Categoria',
  subcategory: 'menu',
  theme: 'default',
  updateCategory: (category) => { set(() => ({ category })) },
  updateSubcategory: (subcategory) => { set(() => ({ subcategory })) }
}))

export default useCreateProduct

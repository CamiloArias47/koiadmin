import { create } from 'zustand'

interface CreateProductType {
  category: string
  subcategory: string
  name: string
  salePrice: number
  updateCategory: (category: string) => void
  updateSubcategory: (subcategory: string) => void
  updateName: (name: string) => void
  updateSalePrice: (salePrice: number) => void
}

const useCreateProduct = create<CreateProductType>(set => ({
  category: 'Categoria',
  subcategory: 'menu',
  name: 'Vista Previa',
  salePrice: 0,
  updateCategory: (category) => { set(() => ({ category })) },
  updateSubcategory: (subcategory) => { set(() => ({ subcategory })) },
  updateName: (name) => { set(() => ({ name })) },
  updateSalePrice: (salePrice) => { set(() => ({ salePrice })) }
}))

export default useCreateProduct

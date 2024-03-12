import { create } from 'zustand'
import {colorPreview} from '../components/products/colors-form'

interface CreateProductType {
  category: string
  subcategory: string
  name: string
  salePrice: number
  description: { __html: string }
  colors: colorPreview[]
  updateCategory: (category: string) => void
  updateSubcategory: (subcategory: string) => void
  updateName: (name: string) => void
  updateSalePrice: (salePrice: number) => void
  updateDescription: (description: { __html: string }) => void
  updateColors: (color: colorPreview[]) => void
}

const useCreateProduct = create<CreateProductType>(set => ({
  category: 'Categoria',
  subcategory: 'menu',
  name: 'Vista Previa',
  salePrice: 0,
  description: { __html: '<p>Descripción del producto</p>' },
  colors: [],
  updateCategory: (category) => { set(() => ({ category })) },
  updateSubcategory: (subcategory) => { set(() => ({ subcategory })) },
  updateName: (name) => { set(() => ({ name })) },
  updateSalePrice: (salePrice) => { set(() => ({ salePrice })) },
  updateDescription: (description) => { set(() => ({ description })) },
  updateColors: (colors) => { set(() => ({ colors })) }
}))

export default useCreateProduct

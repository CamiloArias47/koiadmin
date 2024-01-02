import { FieldValue } from "firebase/firestore"

export default interface ProductModelType {
  amount: number
  category: string
  subcategory: string
  description: string
  name: string
  photo: string
  price: number
  cost: number
  colors?: string[]
  pictures?: string[]
  expire?: string
  timestamp: FieldValue
}

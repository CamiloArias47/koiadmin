import { FieldValue } from "firebase/firestore"

export interface Color { 
  name:string, 
  amount:number, 
  color:string
}
export default interface ProductModelType {
  amount: number
  category: string
  subcategory: string
  description: string
  name: string
  photo: string
  price: number
  cost: number
  colors?: Color[]
  pictures?: (string | undefined | null)[]
  expire?: string
  timestamp: FieldValue
}


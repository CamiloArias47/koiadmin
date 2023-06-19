import { InputField } from '../../form-inputs'

export default function AddCategory (): JSX.Element {
  return (
    <form>
        <h1>Crear categoria</h1>
        <InputField id="category-name" name="category-name" titlename="Nombre Categoria" type="text"/>
        <InputField id="category-image" name="category-image" titlename="Imagen" type="file"/>
    </form>
  )
}

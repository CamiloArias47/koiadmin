import PageLayout from '../../../layouts/page/pageLayout'
import { InputField } from '../../../components/form-inputs'
import Card from '../../../components/card'

export default function CreateProduct (): JSX.Element {
  const header = <h1>Crear Producto</h1>

  const form = (
    <Card>
      <form>
        <InputField id="category" name='categoria' type='text' titlename='Categoria' required/>
      </form>
    </Card>
  )

  return (
    <PageLayout
      header={header}
      body={form}
    />
  )
}

import { Link } from 'react-router-dom'
import PageLayout from '../../layouts/page/pageLayout'
import style from './products.module.css'

export default function Products (): JSX.Element {
  return (
    <>
      <PageLayout
        header={
          <>
            <h1>Productos</h1>
            <Link to="/products/create" className="button">
              Agregar producto
            </Link>
          </>
        }
        aux={
          <div className={style.card}>
            Important info about products.
          </div>
        }
      />
    </>
  )
}

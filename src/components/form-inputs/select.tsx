import InputWraper from './input-wraper'
import styles from './inputfield.module.css'
interface selectFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
}

export default function SelectField (props: selectFieldType): JSX.Element {
  const { titlename, ...cleanProps } = props
  const { id } = props

  return (
    <InputWraper id={id} titlename={titlename}>
      <select
        className={styles.input__field}
        {...cleanProps}
      >
        <option value="cat1">Cat 1</option>
        <option value="cat2">Cat 2</option>
        <option value="cat3">Cat 3</option>
        <option value="cat4">Cat 4</option>
      </select>
    </InputWraper>
  )
}

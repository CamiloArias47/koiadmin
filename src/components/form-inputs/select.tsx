import InputWraper from './input-wraper'
import styles from './inputfield.module.css'
interface selectFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
  options: Array<{ value: string, name: string }>
  onChange?: (value: string, name: string) => void
}

export default function SelectField (props: selectFieldType): JSX.Element {
  const { titlename, options, onChange, ...cleanProps } = props
  const { id } = props

  const handlerChange = (e: any): void => {
    const { value, name } = e.target
    if (onChange != null) onChange(value, name)
  }

  return (
    <InputWraper id={id} titlename={titlename}>
      <select
        onChange={handlerChange}
        className={styles.input__field}
        {...cleanProps}
      >
        {
          options.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)
        }
      </select>
    </InputWraper>
  )
}

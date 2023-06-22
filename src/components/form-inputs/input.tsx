import InputWraper from './input-wraper'
import styles from './inputfield.module.css'
interface inputFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
}

export default function InputField (props: inputFieldType): JSX.Element {
  const { titlename, ...cleanProps } = props
  const { id } = props

  return (
    <InputWraper id={id} titlename={titlename}>
      <input
        className={styles.input__field}
        {...cleanProps}
      />
    </InputWraper>
  )
}

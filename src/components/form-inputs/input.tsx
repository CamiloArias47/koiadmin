import { useRef } from 'react'
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
  error?: string
}

export default function InputField (props: inputFieldType): JSX.Element {
  const input = useRef<HTMLInputElement>(null)
  const { titlename, error, ...cleanProps } = props
  const { id } = props

  if ((error !== undefined && error.length > 0) && input.current != null) {
    input.current.focus()
  }

  return (
    <InputWraper id={id} titlename={titlename} error={error}>
      <input
        ref={input}
        className={styles.input__field}
        {...cleanProps}
      />
    </InputWraper>
  )
}

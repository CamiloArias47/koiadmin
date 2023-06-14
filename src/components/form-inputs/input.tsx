import styles from './inputfield.module.css'
interface inputFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
}

export default function InputField (props: inputFieldType): JSX.Element {
  const { titlename, ...cleanProps } = props
  const { id } = props

  return (
    <div className={styles.input}>
        <label
          className={styles.input__label}
          htmlFor={id}
        >
            { titlename }
        </label>
        <div className={styles.input__border}>
          <input
            className={styles.input__field}
            {...cleanProps}
          >
          </input>
        </div>
    </div>
  )
}

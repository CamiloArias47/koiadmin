import styles from './inputfield.module.css'

interface inputFieldType {
  id: string
  titlename: string
  children: JSX.Element
}

export default function InputWraper (props: inputFieldType): JSX.Element {
  const { id, titlename, children } = props

  return (
    <div className={styles.input}>
        <label
          className={styles.input__label}
          htmlFor={id}
        >
            { titlename }
        </label>
        <div className={styles.input__border}>
          {
            children
          }
        </div>
    </div>
  )
}

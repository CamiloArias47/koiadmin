import styles from './inputfield.module.css'

interface inputFieldType {
  id: string
  titlename: string
  children: JSX.Element
  error?: string
}

export default function InputWraper (props: inputFieldType): JSX.Element {
  const { id, titlename, children, error } = props
  const hasError = (error !== undefined && error.length > 0) ? styles['input--error'] : ''

  return (
    <div className={ styles.input + ' ' + hasError}>
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
        <span className={styles.input__errormsg}>{ error }</span>
    </div>
  )
}

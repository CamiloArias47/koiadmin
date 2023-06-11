import { CloseIcon } from '../../icons'
import { cancelBtn } from '../../styles'
import styles from './modal.module.css'

export default function Modal () {
  return (
    <div className={styles['modal-window']}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <button className={cancelBtn}>
            <CloseIcon className={styles['close-icon']} />
          </button>
        </div>
      </div>
    </div>
  )
}

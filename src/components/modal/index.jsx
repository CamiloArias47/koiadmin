import { CloseIcon } from '../../icons'
import { cancelBtn } from '../../styles'
import useUserInterfaceStore from '../../store/useUserInterface'
import styles from './modal.module.css'

export default function Modal () {
  const [showModal, updateShowModal] = useUserInterfaceStore(state => [state.showModal, state.updateShowModal])

  if (!showModal) return null

  return (
    <div className={styles['modal-window']}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <button className={cancelBtn} onClick={updateShowModal}>
            <CloseIcon className={styles['close-icon']} />
          </button>
        </div>
      </div>
    </div>
  )
}

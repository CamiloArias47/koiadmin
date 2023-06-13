import ModalLeftMenu from './menu'
import { CloseIcon } from '../../icons'
import { cancelBtn } from '../../styles'
import useUserInterfaceStore from '../../store/useUserInterface'
import styles from './modal.module.css'

export default function Modal () {
  const [
    showModal,
    updateShowModal
  ] = useUserInterfaceStore(state => [state.showModal, state.updateShowModal])

  const openAnimation = open => {
    const windowModal = document.querySelector(`.${styles['modal-window']}`)
    const modal = document.querySelector(`.${styles.modal}`)
    const showModalClass = styles['show-modal-window']
    const showModalMainClass = styles['modal-slide']
    if (open) {
      if (windowModal) windowModal.classList.add(showModalClass)
      if (modal) modal.classList.add(showModalMainClass)
    } else {
      if (windowModal) windowModal.classList.remove(showModalClass)
      if (modal) modal.classList.remove(showModalMainClass)
    }
  }

  if (showModal) {
    setTimeout(() => {
      openAnimation(true)
    }, 300)
  }

  const closeModal = () => {
    openAnimation(false)
    setTimeout(() => {
      updateShowModal()
    }, 300)
  }

  if (!showModal) return null

  const body = <ModalLeftMenu />

  return (
    <div className={styles['modal-window']}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <button className={cancelBtn} onClick={closeModal}>
            <CloseIcon className={styles['close-icon']} />
          </button>
        </div>
        <div className={styles.modal__body}>
          { body }
        </div>
      </div>
    </div>
  )
}

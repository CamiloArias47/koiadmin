import { CloseIcon } from '../../icons'
import styles from './modal.module.css'
interface ModalType {
  title: string
  show: boolean
  children: JSX.Element
  onCloseModal: () => void
}

export default function Modal ({ title, show, onCloseModal, children }: ModalType): JSX.Element | null {
  const openAnimation = (open: boolean): void => {
    const windowModal = document.querySelector(`.${styles.modal}`)
    const showModalClass = styles['show-modal']
    if (open) {
      if (windowModal != null) windowModal.classList.add(showModalClass)
    } else {
      if (windowModal != null) windowModal.classList.remove(showModalClass)
    }
  }

  if (show) {
    document.body.classList.add('no-scroll')
    setTimeout(() => {
      openAnimation(true)
    }, 300)
  }

  if (!show) return null

  const closeModal = (): void => {
    document.body.classList.remove('no-scroll')
    openAnimation(false)
    setTimeout(() => {
      onCloseModal()
    }, 300)
  }

  return (
    <div className={styles.modal}>
        <div className={styles.modal_frame}>
          <div className={styles.modal__header}>
            <h2>{ title }</h2>
            <button className={styles.modal__closebtn} onClick={closeModal}>
              <CloseIcon width="14"/>
            </button>
          </div>
          <div className={styles.modal__body}>
            { children }
          </div>
        </div>
    </div>
  )
}

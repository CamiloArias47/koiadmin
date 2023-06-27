import useUserInterfaceStore from '../../store/useUserInterface'
import { CloseIcon } from '../../icons'
import styles from './modal.module.css'
export default function Modal (): JSX.Element | null {
  const [
    showModal,
    updateshowModal
  ]: [boolean, (showState: boolean) => void] = useUserInterfaceStore((state: any) => [
    state.showModal,
    state.updateshowModal
  ])

  const openAnimation = (open: boolean): void => {
    const windowModal = document.querySelector(`.${styles.modal}`)
    const showModalClass = styles['show-modal']
    if (open) {
      if (windowModal != null) windowModal.classList.add(showModalClass)
    } else {
      if (windowModal != null) windowModal.classList.remove(showModalClass)
    }
  }

  if (showModal) {
    document.body.classList.add('no-scroll')
    setTimeout(() => {
      openAnimation(true)
    }, 300)
  }

  if (!showModal) return null

  const closeModal = (): void => {
    document.body.classList.remove('no-scroll')
    openAnimation(false)
    setTimeout(() => {
      updateshowModal(false)
    }, 300)
  }

  return (
    <div className={styles.modal}>
        <div className={styles.modal_frame}>
          <div className={styles.modal__header}>
            <h2>Titulo</h2>
            <button className={styles.modal__closebtn} onClick={closeModal}>
              <CloseIcon width="14"/>
            </button>
          </div>
          <div className={styles.modal__body}>
            Hola estoy en Georgia
          </div>
        </div>
    </div>
  )
}

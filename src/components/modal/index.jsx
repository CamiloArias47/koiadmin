import ModalLeftMenu from './menu'
import AddCategory from './add-category'
import { CloseIcon } from '../../icons'
import { cancelBtn } from '../../styles'
import useUserInterfaceStore, { ModalViews } from '../../store/useUserInterface'
import styles from './modal.module.css'

export default function Modal () {
  const [
    showModal,
    modalView,
    updateShowModal
  ] = useUserInterfaceStore(state => [
    state.showModal,
    state.modalView,
    state.updateShowModal
  ])

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
    document.body.classList.add('no-scroll')
    setTimeout(() => {
      openAnimation(true)
    }, 300)
  }

  const closeModal = () => {
    document.body.classList.remove('no-scroll')
    openAnimation(false)
    setTimeout(() => {
      updateShowModal(false)
    }, 300)
  }

  if (!showModal) return null

  let body = <ModalLeftMenu />
  body = modalView === ModalViews.addCategory ? <AddCategory/> : body

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

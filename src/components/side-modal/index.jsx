import ModalLeftMenu from './menu'
import AddCategory from './add-category'
import { CloseIcon } from '../../icons'
import { cancelBtn } from '../../styles'
import useUserInterfaceStore, { modalSideViews } from '../../store/useUserInterface'
import styles from './modal.module.css'

export default function SideModal () {
  const [
    showSideModal,
    modalSideView,
    updateshowSideModal
  ] = useUserInterfaceStore(state => [
    state.showSideModal,
    state.modalSideView,
    state.updateshowSideModal
  ])

  const openAnimation = open => {
    const windowModal = document.querySelector(`.${styles['modal-window']}`)
    const modal = document.querySelector(`.${styles.modal}`)
    const showSideModalClass = styles['show-modal-window']
    const showSideModalMainClass = styles['modal-slide']
    if (open) {
      if (windowModal) windowModal.classList.add(showSideModalClass)
      if (modal) modal.classList.add(showSideModalMainClass)
    } else {
      if (windowModal) windowModal.classList.remove(showSideModalClass)
      if (modal) modal.classList.remove(showSideModalMainClass)
    }
  }

  if (showSideModal) {
    document.body.classList.add('no-scroll')
    setTimeout(() => {
      openAnimation(true)
    }, 300)
  }

  const closeModal = () => {
    document.body.classList.remove('no-scroll')
    openAnimation(false)
    setTimeout(() => {
      updateshowSideModal(false)
    }, 300)
  }

  if (!showSideModal) return null

  let body = <ModalLeftMenu />
  body = modalSideView === modalSideViews.addCategory ? <AddCategory/> : body

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

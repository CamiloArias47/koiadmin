import { create } from 'zustand'

export enum ModalViews {
  menu,
  addCategory
}

interface UserInterfaceState {
  showModal: boolean
  modalView: ModalViews
  theme: string
  updateShowModal: (showState: boolean) => void
  updateModalView: (modalView: ModalViews) => void
  updateTheme: (by: string) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showModal: false,
  modalView: ModalViews.menu,
  theme: 'default',
  updateShowModal: (showState) => { set(() => ({ showModal: showState })) },
  updateModalView: (modalView) => { set(() => ({ modalView })) },
  updateTheme: (theme) => { set(() => ({ theme })) }
}))

export default useUserInterfaceStore

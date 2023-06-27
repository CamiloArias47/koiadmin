import { create } from 'zustand'

export enum modalSideViews {
  menu,
  addCategory
}

interface UserInterfaceState {
  showSideModal: boolean
  modalSideView: modalSideViews
  theme: string
  showModal: boolean
  updateshowSideModal: (showState: boolean) => void
  updatemodalSideView: (modalSideView: modalSideViews) => void
  updateTheme: (by: string) => void
  updateshowModal: (showState: boolean) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showSideModal: false,
  modalSideView: modalSideViews.menu,
  theme: 'default',
  showModal: false,
  updateshowSideModal: (showState) => { set(() => ({ showSideModal: showState })) },
  updatemodalSideView: (modalSideView) => { set(() => ({ modalSideView })) },
  updateTheme: (theme) => { set(() => ({ theme })) },
  updateshowModal: (showModal) => { set(() => ({ showModal })) }
}))

export default useUserInterfaceStore

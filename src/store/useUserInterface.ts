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
  modalTitle: string
  modalBody: JSX.Element
  updateshowSideModal: (showState: boolean) => void
  updatemodalSideView: (modalSideView: modalSideViews) => void
  updatemodalBodyView: (title: string, modalBody: JSX.Element) => void
  updateTheme: (by: string) => void
  updateshowModal: (showState: boolean) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showSideModal: false,
  modalSideView: modalSideViews.menu,
  theme: 'default',
  showModal: false,
  modalTitle: '',
  modalBody: '' as unknown as JSX.Element,
  updateshowSideModal: (showState) => { set(() => ({ showSideModal: showState })) },
  updatemodalSideView: (modalSideView) => { set(() => ({ modalSideView })) },
  updatemodalBodyView: (modalTitle, modalBody) => { set(() => ({ modalTitle, modalBody })) },
  updateTheme: (theme) => { set(() => ({ theme })) },
  updateshowModal: (showModal) => { set(() => ({ showModal })) }
}))

export default useUserInterfaceStore

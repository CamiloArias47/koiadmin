import { create } from 'zustand'

interface UserInterfaceState {
  showModal: boolean
  modalView: string
  theme: string
  updateShowModal: (by: boolean) => void
  updateModalView: (by: string) => void
  updateTheme: (by: string) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showModal: false,
  modalView: 'menu',
  theme: 'default',
  updateShowModal: (by) => { set(state => ({ showModal: !state.showModal })) },
  updateModalView: (modalView) => { set(() => ({ modalView })) },
  updateTheme: (theme) => { set(() => ({ theme })) }
}))

export default useUserInterfaceStore

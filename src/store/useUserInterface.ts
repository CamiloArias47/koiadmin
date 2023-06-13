import { create } from 'zustand'

interface UserInterfaceState {
  showModal: boolean
  modalView: string
  updateShowModal: (by: boolean) => void
  updateModalView: (by: string) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showModal: false,
  modalView: 'menu',
  updateShowModal: (by) => { set(state => ({ showModal: !state.showModal })) },
  updateModalView: (modalView) => { set(() => ({ modalView })) }
}))

export default useUserInterfaceStore

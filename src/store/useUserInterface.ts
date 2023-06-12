import { create } from 'zustand'

interface UserInterfaceState {
  showModal: boolean
  updateShowModal: (by: boolean) => void
}

const useUserInterfaceStore = create<UserInterfaceState>(set => ({
  showModal: false,
  updateShowModal: (by) => { set(state => ({ showModal: !state.showModal })) }
}))

export default useUserInterfaceStore

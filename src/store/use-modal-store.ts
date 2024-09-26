import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

export interface IModalState {
  isOpen: boolean
  actions: {
    openModal: () => void
    closeModal: () => void
    toggleModal: () => void
  }
}

export const useMobileMenuModalStore = create<IModalState>((set) => ({
  isOpen: false,
  actions: {
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}))

export const useMobileMenuStoreGetter = (key: keyof IModalState) =>
  useMobileMenuModalStore((state) => state[key])
export const mobileMenuStoreActions = useMobileMenuModalStore.getState().actions

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('mobile-menu-modal-store', useMobileMenuModalStore)
}

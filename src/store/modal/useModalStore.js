import { create } from 'zustand'

const useModalStore = create((set) => ({
  isOpen: false,
  title: '',
  description: '',
  buttonLabel: '',
  onButtonClick: null,

  openModal: ({ title, description, buttonLabel, onButtonClick }) => {
    set({
      isOpen: true,
      title,
      description,
      buttonLabel,
      onButtonClick,
    })
  },

  closeModal: () => set({ isOpen: false }),
}))

export default useModalStore

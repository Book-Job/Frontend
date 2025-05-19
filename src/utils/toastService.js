import { toast } from 'react-toastify'

const defaultOptions = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
}

const ToastService = {
  success: (message, options = {}) =>
    toast.success(message, {
      ...defaultOptions,
      className: 'bg-pink-100 text-main-pink font-semibold rounded shadow',
      progressClassName: 'bg-main-pink',
      icon: '🌸',
      ...options,
    }),

  error: (message, options = {}) =>
    toast.error(message, {
      ...defaultOptions,
      className: 'bg-red-100 text-red-700 font-semibold rounded shadow',
      progressClassName: 'bg-red-500',
      icon: '❌',
      ...options,
    }),

  info: (message, options = {}) =>
    toast.info(message, {
      ...defaultOptions,
      className: 'bg-blue-100 text-blue-700 font-semibold rounded shadow',
      progressClassName: 'bg-blue-500',
      icon: 'ℹ️',
      ...options,
    }),

  warning: (message, options = {}) =>
    toast.warn(message, {
      ...defaultOptions,
      className: 'bg-yellow-100 text-yellow-700 font-semibold rounded shadow',
      progressClassName: 'bg-yellow-500',
      icon: '⚠️',
      ...options,
    }),
}

export default ToastService

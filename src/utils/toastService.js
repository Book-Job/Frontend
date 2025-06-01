import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
}

const baseStyle = {
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontWeight: '600',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
}

const ToastService = {
  success: (message, options = {}) =>
    toast.success(message, {
      ...defaultOptions,
      style: {
        backgroundColor: '#fbcfe8',
        color: '#ec4899',
        ...baseStyle,
      },
      progressStyle: {
        background: '#ec4899',
        borderRadius: '12px',
      },
      icon: '🌸',
      ...options,
    }),

  error: (message, options = {}) =>
    toast.error(message, {
      ...defaultOptions,
      style: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        ...baseStyle,
      },
      progressStyle: {
        background: '#ef4444',
        borderRadius: '12px',
      },
      icon: '❌',
      ...options,
    }),

  info: (message, options = {}) =>
    toast.info(message, {
      ...defaultOptions,
      style: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        ...baseStyle,
      },
      progressStyle: {
        background: '#3b82f6',
        borderRadius: '12px',
      },
      icon: 'ℹ️',
      ...options,
    }),

  warning: (message, options = {}) =>
    toast.warn(message, {
      ...defaultOptions,
      style: {
        backgroundColor: '#fef9c3',
        color: '#92400e',
        ...baseStyle,
      },
      progressStyle: {
        background: '#facc15',
        borderRadius: '12px',
      },
      icon: '⚠️',
      ...options,
    }),
}

export default ToastService

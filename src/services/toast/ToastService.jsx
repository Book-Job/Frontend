import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ToastMessage from '../../components/common/ToastMessage'

const defaultOptions = {
  position: 'bottom-center',
  autoClose: 1800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
}

const baseStyle = {
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.16)',
  fontWeight: 700,
  fontSize: '16px',
  padding: '14px 28px',
  background: '#23272F',
  color: '#fff',
  minWidth: 'auto',
  maxWidth: '320px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  letterSpacing: '-0.01em',
  lineHeight: '1.5',
  boxSizing: 'border-box',
}

const ToastService = {
  success: (message, options = {}) =>
    toast.success(<ToastMessage>{message}</ToastMessage>, {
      ...defaultOptions,
      style: {
        ...baseStyle,
        color: '#2dd6c1',
        border: '1px solid #2dd6c1',
      },
      icon: '✅',
      ...options,
    }),

  error: (message, options = {}) =>
    toast.error(<ToastMessage>{message}</ToastMessage>, {
      ...defaultOptions,
      style: {
        ...baseStyle,
        color: '#ff6666',
        border: '1px solid #ff6666',
      },
      icon: '❌',
      ...options,
    }),

  info: (message, options = {}) =>
    toast.info(<ToastMessage>{message}</ToastMessage>, {
      ...defaultOptions,
      style: {
        ...baseStyle,
        color: '#3182f6',
        border: '1px solid #3182f6',
      },
      icon: '💡',
      ...options,
    }),

  warning: (message, options = {}) =>
    toast.warn(<ToastMessage>{message}</ToastMessage>, {
      ...defaultOptions,
      style: {
        ...baseStyle,
        color: '#facc15',
        border: '1px solid #facc15',
      },
      icon: '⚠️',
      ...options,
    }),
}

export default ToastService

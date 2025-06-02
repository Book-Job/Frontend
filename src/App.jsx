import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import PageScrollToTop from './components/common/PageScrollToTop'
import { useEffect } from 'react'
import useAuthStore from './store/login/useAuthStore'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Modal from './components/web/Modal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function App() {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer position='top-center' autoClose={2000} theme='colored' />
      <PageScrollToTop />
      <AppRoutes />
      <Modal />
    </BrowserRouter>
  )
}

export default App

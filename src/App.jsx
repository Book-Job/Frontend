import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import PageScrollToTop from './components/common/PageScrollToTop'
import { useEffect } from 'react'
import useAuthStore from './store/login/useAuthStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <ToastContainer position='top-center' autoClose={4000} />
      <PageScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

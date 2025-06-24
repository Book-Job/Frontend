import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import PageScrollToTop from './components/common/PageScrollToTop'
import { useEffect } from 'react'
import useAuthStore from './store/login/useAuthStore'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Modal from './components/web/Modal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer
          position='bottom-center'
          autoClose={2000}
          theme='colored'
          toastClassName='!rounded-xl !shadow-md !p-4 !text-sm w-full max-w-[360px] mx-auto'
          bodyClassName='text-sm font-semibold'
          hideProgressBar={true}
          style={{ marginBottom: '60px' }}
        />
        <PageScrollToTop />
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
        <Modal />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

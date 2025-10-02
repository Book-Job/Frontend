import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AppRoutes from './routes/AppRoutes'
import { SpeedInsights } from '@vercel/speed-insights/react'
import PageScrollToTop from './components/common/PageScrollToTop'
import { useEffect } from 'react'
import useAuthStore from './store/login/useAuthStore'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Modal from './components/web/Modal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PwaPopUp from './components/common/PwaPopUp'
import ModalManager from './domains/main/common/components/Modals/ModalManager'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <link rel='canonical' href='https://www.bookjob.co.kr' />
        {import.meta.env.VITE_VERCEL_ENV === 'preview' && <meta name='robots' content='noindex' />}
      </Helmet>

      <PwaPopUp />
      <ModalManager />
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
      <SpeedInsights />
    </QueryClientProvider>
  )
}

export default App

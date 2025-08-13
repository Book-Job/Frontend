import { BrowserRouter, useLocation } from 'react-router-dom'
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
import PwaPopUp from './components/common/PwaPopUp'
import ReactGA from 'react-ga4'

const queryClient = new QueryClient()
ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID)

function App() {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  const TrackPageViews = () => {
    const location = useLocation()

    useEffect(() => {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      })
    }, [location])

    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PwaPopUp />
      <BrowserRouter>
        <TrackPageViews />
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

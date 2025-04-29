import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import PageScrollToTop from './components/common/PageScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <PageScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

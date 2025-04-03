import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  )
}

export default AppRoutes

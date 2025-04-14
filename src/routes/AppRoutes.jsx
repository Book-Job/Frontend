import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Layout noMargin={route.noMargin}>{route.element}</Layout>}
        />
      ))}
    </Routes>
  )
}

export default AppRoutes

import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'

const AppRoutes = () => {
  const mainPaths = ['/', '/community', '/user-post', '/job']
  return (
    <Routes>
      {routes.map((route, index) => {
        const isMain = mainPaths.includes(route.path)

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout headerType={isMain ? 'main' : 'sub'} label={route.label}>
                {route.element}
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}

export default AppRoutes

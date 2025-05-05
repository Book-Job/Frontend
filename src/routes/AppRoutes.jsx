import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'
import useAuthStore from '../store/login/useAuthStore'

const AppRoutes = () => {
  const mainPaths = ['/', '/community', '/user-post', '/job']
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Routes>
      {routes.map((route, index) => {
        const isMain = mainPaths.includes(route.path)

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout
                headerType={isMain ? 'main' : 'sub'}
                label={route.label}
                noMargin={route.noMargin}
              >
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

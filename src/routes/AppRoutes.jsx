import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  const mainPaths = ['/', '/community', '/user-post', '/job']

  return (
    <Routes>
      {routes.map((route, index) => {
        const isMain = mainPaths.includes(route.path)

        const content = route.isProtected ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        )

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout
                headerType={isMain ? 'main' : 'sub'}
                label={route.label}
                noMargin={route.noMargin}
                paddingX={route.paddingX}
              >
                {content}
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}

export default AppRoutes

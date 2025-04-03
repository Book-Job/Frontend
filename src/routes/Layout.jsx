import Header from '../components/web/Header'
import Footer from './../components/web/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout

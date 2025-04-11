import Header from '../components/web/Header'
import Footer from './../components/web/Footer'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-col justify-center flex-1 mx-4 my-4 sm:my-10 sm:mx-10'>{children}</main>
      <Footer email='bookjob@gmail.com'/>
    </div>
  )
}

export default Layout

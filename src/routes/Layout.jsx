import Header from '../components/web/Header'
import Footer from './../components/web/Footer'

const Layout = ({ children, noMargin = false }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main
        className={`flex flex-col  flex-1 ${
          noMargin ? 'mb-4 sm:mb-10' : 'mx-4 my-4 sm:my-10 sm:mx-10 justify-center'
        }`}
      >
        {children}
      </main>
      <Footer email='bookjob@gmail.com' />
    </div>
  )
}

export default Layout

import Header from '../components/web/Header'
import MobileHeader from '../components/app/MobileHeader'
import MobileMainHeader from '../components/app/MobileMainHeader'
import useIsMobile from '../hooks/header/useIsMobile'
import Footer from './../components/web/Footer'
import ScrollBtn from '../components/common/ScrollAndWriteButton'

const Layout = ({ children, headerType, label, noMargin = false }) => {
  const isMobile = useIsMobile()

  const headerHeight = isMobile ? (headerType === 'main' ? 70 : 0) : 100

  return (
    <div className='flex flex-col min-h-screen'>
      {isMobile ? (
        headerType === 'main' ? (
          <MobileMainHeader />
        ) : (
          <MobileHeader label={label} onClick={() => window.history.back()} />
        )
      ) : (
        <Header />
      )}

      <main
        className={`flex flex-col flex-1 ${
          noMargin ? 'mb-4 sm:mb-10' : 'm-4 sm:m-10 justify-center'
        }`}
        style={{ paddingTop: `${headerHeight}px` }}
      >
        {children}
      </main>
      <Footer email='bookjob.help@gmail.com' />
      <ScrollBtn />
    </div>
  )
}

export default Layout

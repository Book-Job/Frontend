import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../../hooks/header/useIsMobile'
import favicon from '../../../public/favicon-144x144.png'
import { IoClose } from 'react-icons/io5'

const HIDE_ANIMATION_DURATION = 1000
const SNOOZE_DURATION = 1000 * 60 * 30
const LOCAL_STORAGE_KEY = 'pwaPopupHiddenDate'

const PwaPopUp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isDisplayAllowed, setIsDisplayAllowed] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const timerRef = useRef(null)
  const isMobile = useIsMobile()

  const isVisible = isDisplayAllowed && deferredPrompt

  useEffect(() => {
    const hiddenDate = localStorage.getItem(LOCAL_STORAGE_KEY)
    const today = new Date().toDateString()
    if (hiddenDate !== today) {
      setIsDisplayAllowed(true)
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      clearTimeout(timerRef.current)
    }
  }, [])

  const scheduleNextAppearance = () => {
    setIsDisplayAllowed(false)

    if (dontShowToday) {
      localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toDateString())
    } else {
      timerRef.current = setTimeout(() => {
        setIsDisplayAllowed(true)
      }, SNOOZE_DURATION)
    }
  }

  const handleClose = () => {
    scheduleNextAppearance()
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()

    const outcome = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsDisplayAllowed(false)
      timerRef.current = setTimeout(() => {
        setDeferredPrompt(null)
      }, HIDE_ANIMATION_DURATION)
    } else {
      scheduleNextAppearance()
    }
  }

  const MobilePopup = (
    <>
      {/* <div className='fixed z-50 w-full h-auto bottom-32'>
        <div className='flex items-center justify-between w-full px-4'>
          <label className='flex gap-2 bg-white'>
            <input
              type='checkbox'
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className='form-checkbox'
            />
            <span className='text-xs'>오늘 하루 그만보기</span>
          </label>
          <button onClick={handleClose} className='flex items-center text-xl text-black bg-white'>
            <IoClose />
          </button>
        </div>
        <div className='flex items-center justify-between w-auto h-12 px-2 mx-4 bg-white border rounded-full border-main-pink'>
          <img src={favicon} alt='favicon' className='mx-2 w-7' />
          <p className='ml-3 text-sm'>
            <span className='font-bold text-main-pink'>bookjob</span>
            <span>을 앱 처럼 사용해보세요.</span>
          </p>
          <button onClick={handleInstallClick} className='flex'>
            <span className='px-3 py-1 ml-3 rounded-full text-zinc-200 bg-main-pink shadow-l'>
              Install
            </span>
          </button>
        </div>
      </div> */}

      <div className='fixed z-50 w-full h-auto bottom-4'>
        {/* <div className='flex items-center mx-4 mb-1'>
          <label className='flex space-x-2 bg-white'>
            <input
              type='checkbox'
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className='form-checkbox'
            />
            <span className='text-xs'>오늘 하루 그만보기</span>
          </label>
        </div> */}
        <div
          onClick={handleInstallClick}
          className='flex items-center w-auto h-12 px-2 mx-4 border rounded-md bg-black/85 backdrop-blur-sm '
        >
          <img src={favicon} alt='favicon' className='mx-2 w-7' />
          <p className='flex items-center w-full ml-2 text-sm'>
            <span className='font-bold text-main-pink'>bookjob</span>
            <span className='ml-1 text-white'>앱 처럼 보기.</span>
          </p>
          <button onClick={handleClose} className='flex items-center h-full text-xl text-white'>
            <IoClose />
          </button>
        </div>
      </div>

      {/* <div className='fixed bottom-0 z-50 w-full h-auto'>
        <div className='px-2 pb-1 bg-white'>
          <label className='flex gap-2'>
            <input
              type='checkbox'
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className='form-checkbox'
            />
            <span className='text-xs'>오늘 하루 그만보기</span>
          </label>
        </div>
        <div className='flex items-center justify-between w-full h-24 pb-4 pl-2 pr-4 bg-zinc-800'>
          <button onClick={handleClose} className='text-2xl text-white'>
            <IoClose />
          </button>
          <img src={favicon} alt='favicon' className='w-10 mx-2' />
          <p className='flex-wrap px-1 text-sm text-white break-keep text-start'>
            설치하면 한 번의 터치로 바로 접속할 수 있어요
          </p>
          <button onClick={handleInstallClick} className='flex'>
            <span className='px-5 py-2 ml-3 rounded-full text-zinc-200 bg-main-pink shadow-l'>
              Install
            </span>
          </button>
        </div>
      </div> */}
    </>
  )
  const DesktopPopup = (
    <div className='fixed z-50 flex flex-col items-start h-auto p-1 w-96 bottom-44 left-4'>
      <div className='flex flex-col items-center w-full h-[100px] p-1 rounded-lg bg-black/85 backdrop-blur-sm'>
        <button onClick={handleClose} className='flex justify-end w-full text-white'>
          <IoClose />
        </button>
        <div className='flex flex-row items-center justify-between w-full px-2 pb-1'>
          <p className='flex gap-4 text-start'>
            <img src={favicon} alt='favicon' className='w-14 h-14 ' />
            <span className='flex items-center text-white'>
              홈 화면에 추가하고
              <br />더 빠르게 이용하세요
            </span>
          </p>
          <button
            onClick={handleInstallClick}
            className='px-5 py-2 transition-all rounded-full text-zinc-800 bg-[#FDF8FA] shadow-l hover:bg-main-pink hover:scale-105 hover:text-[#FDF8FA]'
          >
            <span>Install</span>
          </button>
        </div>
      </div>
      <label className='flex w-full gap-2 px-2 bg-white'>
        <input
          type='checkbox'
          checked={dontShowToday}
          onChange={(e) => setDontShowToday(e.target.checked)}
          className='form-checkbox'
        />
        <span className='text-sm'>오늘 하루 그만보기</span>
      </label>
    </div>
  )

  return (
    <div
      className={`fixed z-50 bottom-0 transition-all duration-1000 ease-in-out w-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none '
        // isVisible ? 'opacity-0 translate-y-5 pointer-events-none ' : 'opacity-100 translate-y-0' //테스트용
      }`}
    >
      {deferredPrompt && (isMobile ? MobilePopup : DesktopPopup)}
      {/* {isMobile ? MobilePopup : DesktopPopup} //테스트용 */}
    </div>
  )
}

export default PwaPopUp

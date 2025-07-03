import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../../hooks/header/useIsMobile'
import favicon from '../../../public/favicon-144x144.png'
import { IoClose } from 'react-icons/io5'
const PwaPopUp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [dontShow, setDontShow] = useState(false)
  const timerRef = useRef(null)
  const isMobile = useIsMobile()

  console.log('PWA 1')

  useEffect(() => {
    console.log('PWA 2')

    // localStorage에서 오늘 팝업 숨김 여부 확인
    const lastHiddenDate = localStorage.getItem('pwaPopupHidden')
    const today = new Date().toDateString()
    if (lastHiddenDate !== today) {
      setShowInstallButton(true)
    }

    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA 3')
      e.preventDefault()
      setDeferredPrompt(e)
      console.log('PWA 4')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        console.log('PWA 7: 5분 뒤 버튼 재표시 끝')
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    console.log('PWA 5')

    await deferredPrompt.prompt()
    console.log('PWA 6')

    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('사용자가 앱 설치를 수락했습니다.')
      setShowInstallButton(false)
    } else {
      console.log('사용자가 앱 설치를 거부했습니다.')
      if (!dontShowToday) {
        timerRef.current = setTimeout(() => {
          setShowInstallButton(true)
          console.log('PWA 7: 5분 뒤 버튼 재표시')
        }, 600000)
      }
    }

    setDeferredPrompt(null)
  }

  const handleDontShowToday = (e) => {
    setDontShowToday(e.target.checked)
    console.log('PWA :하루동안 안보기 1')
  }

  const handleClose = (e) => {
    if (dontShowToday) {
      localStorage.setItem('pwaPopupHidden', new Date().toDateString())
      setShowInstallButton(false)
      console.log('PWA :하루동안 안보기 2')
    } else {
      console.log('PWA 7: 5분 뒤 버튼 재표시 시작')
      setShowInstallButton(false)
      timerRef.current = setTimeout(() => {
        setShowInstallButton(true)
        console.log('PWA 7: 5분 뒤 버튼 재표시 끝')
      }, 600000)
    }
  }

  const installPopup = isMobile ? (
    <>
      <div className='fixed z-50 w-full h-auto transition-all bottom-32'>
        {/* <div className='flex items-center px-2 pb-2 '>
        <label className='flex space-x-2 bg-white'>
          <input
            type='checkbox'
            checked={dontShowToday}
            onChange={handleDontShowToday}
            className='form-checkbox'
          />
          <span className='text-xs'>오늘 하루 그만보기</span>
        </label>
      </div> */}
        <div className='flex justify-end w-full'>
          <button onClick={handleClose} className='mr-3 text-2xl'>
            <IoClose />
          </button>
        </div>
        <div className='flex items-center justify-between w-auto h-12 px-2 mx-4 bg-white border rounded-full border-main-pink'>
          <img src={favicon} alt='favicon' className='mx-2 w-7' />
          <p className='px-1 text-xs'>
            <span className='font-bold text-main-pink'>bookjob</span>
            <span className='flex-wrap'>을 앱 처럼 사용할 수 있습니다.</span>
          </p>
          <button onClick={handleInstallClick} className='flex'>
            <span className='px-3 py-1 ml-3 rounded-full text-zinc-200 bg-main-pink shadow-l'>
              Install
            </span>
          </button>
        </div>
      </div>
      <div className='fixed bottom-0 z-50 w-full h-auto transition-all'>
        <div className='px-2 pb-1 bg-white'>
          <label className='flex gap-2'>
            <input
              type='checkbox'
              checked={dontShowToday}
              onChange={handleDontShowToday}
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
          <p className='px-1 text-sm text-white text-wrap text-start'>
            앱 처럼 홈에서 바로가기 기능을 추가 할 수 있습니다.
          </p>
          <button onClick={handleInstallClick} className='flex'>
            <span className='px-5 py-2 ml-3 rounded-full text-zinc-200 bg-main-pink shadow-l'>
              Install
            </span>
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className='fixed z-50 flex flex-col items-start h-auto p-1 transition-all w-96 bottom-48 left-4'>
      <div className='flex flex-col items-center w-full p-1 rounded-lg bg-zinc-800 h-28 '>
        <button onClick={handleClose} className='flex justify-end w-full text-white'>
          <IoClose />
        </button>
        <div className='flex flex-row items-center justify-between w-full p-2'>
          <p className='flex flex-wrap gap-4 text-start'>
            <img src={favicon} alt='favicon' className='w-14 h-14 ' />
            <span className='text-white'>
              간편하게 홈 화면에
              <br /> 바로가기 추가!
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
          onChange={handleDontShowToday}
          className='form-checkbox'
        />
        <span className='text-sm'>오늘 하루 그만보기</span>
      </label>
    </div>
  )

  return (
    <div>
      {/* {showInstallButton && installPopup} */}
      {installPopup}
    </div>
  )
}

export default PwaPopUp

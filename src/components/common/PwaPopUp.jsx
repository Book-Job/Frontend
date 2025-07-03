import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../../hooks/header/useIsMobile'

const PwaPopUp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const timerRef = useRef(null)
  const ismobile = useIsMobile()

  console.log('PWA 1')

  useEffect(() => {
    console.log('PWA 2')

    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA 3')
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
      console.log('PWA 4')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
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
      setShowInstallButton(false)
      timerRef.current = setTimeout(() => {
        setShowInstallButton(true)
        console.log('PWA 7: 5분 뒤 버튼 재표시')
      }, 300000)
    }

    setDeferredPrompt(null)
  }

  const installButton = ismobile ? (
    <button
      onClick={handleInstallClick}
      className='fixed z-50 px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg bottom-60 right-4 hover:bg-blue-600'
    >
      앱 설치
    </button>
  ) : (
    <button
      onClick={handleInstallClick}
      className='fixed z-50 px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg bottom-60 right-4 hover:bg-blue-600'
    >
      홈 화면에 추가
    </button>
  )
  return <div>{showInstallButton && installButton}</div>
}

export default PwaPopUp

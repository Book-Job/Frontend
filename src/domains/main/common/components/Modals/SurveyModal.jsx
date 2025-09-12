import { CUSTOMER_INQUIRY } from '../../../../../utils/urls'
import app_banner from '../../../../../assets/banner/app_banner.jpg'
import web_banner from '../../../../../assets/banner/web_banner.jpg'
import useAuthStore from '../../../../../store/login/useAuthStore'
import { useEffect, useState } from 'react'
import EventModal from '../EventModal'

const PROMO_LOCK_KEY = '__PROMO_MODAL_OPEN__'

export default function SurveyModal() {
  const { isAuthenticated } = useAuthStore()

  const [isSurveyOpen, setIsSurveyOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    const today = new Date().toDateString()
    const hideUntil = localStorage.getItem('hideSurveyPopupUntil')

    if (hideUntil !== today) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window[PROMO_LOCK_KEY]) return
        if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = true
        setIsSurveyOpen(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem('hideSurveyPopupUntil', today)
    setIsSurveyOpen(false)
    if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = false
  }

  return (
    <div>
      <EventModal
        isOpen={isSurveyOpen}
        onClose={() => {
          setIsSurveyOpen(false)
          if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = false
        }}
        onDoNotShowToday={handleDoNotShowToday}
        image={web_banner}
        mobileImage={app_banner}
        link={CUSTOMER_INQUIRY}
        alt='설문조사 배너'
        doNotShowText='오늘 하루 보지 않기'
      />
    </div>
  )
}

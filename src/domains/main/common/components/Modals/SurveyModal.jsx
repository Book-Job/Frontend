import { CUSTOMER_INQUIRY } from '../../../../../utils/urls'
import app_banner from '../../../../../assets/banner/app_banner.jpg'
import web_banner from '../../../../../assets/banner/web_banner.jpg'
import useAuthStore from '../../../../../store/login/useAuthStore'
import { useEffect, useState } from 'react'
import EventModal from '../EventModal'

export default function SurveyModal() {
  const { isAuthenticated } = useAuthStore()

  const [isSurveyOpen, setIsSurveyOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    const today = new Date().toDateString()
    const hideUntil = localStorage.getItem('hideSurveyPopupUntil')

    if (hideUntil !== today) {
      const timer = setTimeout(() => {
        setIsSurveyOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem('hideSurveyPopupUntil', today)
    setIsSurveyOpen(false)
  }
  
  return (
    <div>
      <EventModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
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

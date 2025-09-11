import { useEffect, useState } from 'react'
import Modal from '../Modal'
import coffee_event_modal from '../../../../../assets/banner/coffee_event_modal.png'
import useWriteModalStore from '../../../../../store/modal/useWriteModalStore'

const CoffeeEvent = () => {
  const { setShowModal } = useWriteModalStore()
  const [isSurveyOpen, setIsSurveyOpen] = useState(false)
  const writeEvent = () => setShowModal(true)

  useEffect(() => {
    const today = new Date().toDateString()
    const hideUntil = localStorage.getItem('hideSurveyPopupUntil_2')

    if (hideUntil !== today) {
      const timer = setTimeout(() => {
        setIsSurveyOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem('hideSurveyPopupUntil_2', today)
    setIsSurveyOpen(false)
  }

  return (
    <div>
      <Modal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        onDoNotShowToday={handleDoNotShowToday}
        image={coffee_event_modal}
        mobileImage={coffee_event_modal}
        onClick={writeEvent}
        alt='커피 이벤트 배너'
        doNotShowText='오늘 하루 보지 않기'
      />
    </div>
  )
}

export default CoffeeEvent

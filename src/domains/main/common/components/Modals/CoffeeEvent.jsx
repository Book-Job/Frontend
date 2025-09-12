import { useEffect, useState } from 'react'
import coffee_event_modal from '../../../../../assets/banner/coffee_event_modal.jpg'
import useWriteModalStore from '../../../../../store/modal/useWriteModalStore'
import EventModal from '../EventModal'

const PROMO_LOCK_KEY = '__PROMO_MODAL_OPEN__'

const CoffeeEvent = () => {
  const { setShowModal } = useWriteModalStore()
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false)

  const writeEvent = () => {
    setIsCoffeeOpen(false)
    setShowModal(true)
  }

  useEffect(() => {
    const today = new Date().toDateString()
    const hideUntil = localStorage.getItem('hideCoffeePopupUntil')

    if (hideUntil !== today) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window[PROMO_LOCK_KEY]) return
        if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = true
        setIsCoffeeOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem('hideCoffeePopupUntil', today)
    setIsCoffeeOpen(false)
    if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = false
  }

  return (
    <div>
      <EventModal
        isOpen={isCoffeeOpen}
        onClose={() => {
          setIsCoffeeOpen(false)
          if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = false
        }}
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

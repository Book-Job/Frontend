import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import EventModal from './EventModal'
import useAuthStore from '../../../../../store/login/useAuthStore'
import useWriteModalStore from '../../../../../store/modal/useWriteModalStore'
import modalConfigs from './modalConfigs';


const PROMO_LOCK_KEY = '__PROMO_MODAL_OPEN__'

export default function ModalManager() {
  const { isAuthenticated } = useAuthStore()
  const { setShowModal } = useWriteModalStore()
  const [modalQueue, setModalQueue] = useState([])
  const [currentModal, setCurrentModal] = useState(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const queue = modalConfigs.filter((config) => {
      const hideUntil = localStorage.getItem(config.doNotShowKey)
      return hideUntil !== today && config.condition({ isAuthenticated })
    })

    setModalQueue(queue)
  }, [isAuthenticated])

  useEffect(() => {
    if (modalQueue.length === 0 || currentModal) return

    const nextModal = modalQueue[0]
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window[PROMO_LOCK_KEY]) return
      if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = true
      setCurrentModal(nextModal)
    }, nextModal.delay)

    return () => clearTimeout(timer)
  }, [modalQueue, currentModal])

  const handleClose = () => {
    if (typeof window !== 'undefined') window[PROMO_LOCK_KEY] = false
    setCurrentModal(null)
    setModalQueue((prev) => prev.slice(1))
  }

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem(currentModal.doNotShowKey, today)
    handleClose()
  }

  return (
    <div>
      {currentModal && (
        <EventModal
          isOpen={!!currentModal}
          onClose={handleClose}
          onDoNotShowToday={handleDoNotShowToday}
          image={currentModal.image}
          mobileImage={currentModal.mobileImage}
          link={currentModal.link}
          alt={currentModal.alt}
          doNotShowText='오늘 하루 보지 않기'
          onClick={currentModal.onClick ? currentModal.onClick({ setShowModal }) : undefined}
        />
      )}
    </div>
  )
}
ModalManager.propTypes = {
  isAuthenticated: PropTypes.bool,
  setShowModal: PropTypes.func,
}

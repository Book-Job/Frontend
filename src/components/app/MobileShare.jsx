import PropTypes from 'prop-types'
import ToastService from '../../services/toast/ToastService'

const MobileShare = ({ label, icon, textColor, weblink, post, isShare }) => {
  const handleShare = async () => {
    if (!isShare) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: `제목 : ${post.title}`,
          text: `${post.nickname}님이 공유한 글을 확인하세요.`,
          url: weblink,
        })

        ToastService.success('공유 성공')
      } catch (error) {
        if (error.name === 'AbortError') {
          ToastService.info('공유가 취소되었습니다.')
        } else {
          console.error('공유 실패', error)
          ToastService.error('공유 중 오류가 발생했습니다.')
        }
      }
    } else {
      ToastService.info('공유 기능을 지원하지 않는 브라우저입니다.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1 w-auto h-[24px] bg-none ${textColor}`}
      type='button'
    >
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      <span className='flex font-semibold text-[12px]'>{label}</span>
    </button>
  )
}

MobileShare.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  weblink: PropTypes.string,
  post: PropTypes.object,
  textColor: PropTypes.string,
  isShare: PropTypes.bool,
}

MobileShare.defaultProps = {
  icon: null,
  weblink: '',
  post: null,
  textColor: '',
  isShare: false,
}

export default MobileShare

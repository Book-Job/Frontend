import coffee_event_modal from '../../../../../assets/banner/coffee_event_modal.jpg'
import app_banner from '../../../../../assets/banner/app_banner.jpg'
import web_banner from '../../../../../assets/banner/web_banner.jpg'
import { CUSTOMER_INQUIRY } from '../../../../../utils/urls'

const modalConfigs = [
  {
    id: 'coffee',
    image: coffee_event_modal,
    mobileImage: coffee_event_modal,
    alt: '커피 이벤트 배너',
    doNotShowKey: 'hideCoffeePopupUntil',
    delay: 300,
    condition: () => true,
    onClick:
      ({ setShowModal }) =>
      () => {
        setShowModal(true)
      },
  },
  {
    id: 'survey',
    image: web_banner,
    mobileImage: app_banner,
    alt: '설문조사 배너',
    doNotShowKey: 'hideSurveyPopupUntil',
    delay: 300,
    link: CUSTOMER_INQUIRY,
    condition: ({ isAuthenticated }) => isAuthenticated,
  },
]
export default modalConfigs

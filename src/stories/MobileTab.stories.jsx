import MobileTab from '../components/app/MobileTab'
import tabMobileActiveFreeboard from '../assets/icons/mobile/mobile_freeboard_pink.svg'
import tabMobileInactiveFreeboard from '../assets/icons/mobile/mobile_freeboard_gray.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/app/MobileTab',
  component: MobileTab,
  parameters: {
    layout: 'centered',
  },
}

const Template = (args) => <MobileTab {...args} />

export const ActiveTab = Template.bind({})
ActiveTab.args = {
  icon: tabMobileActiveFreeboard,
  label: '자유게시판',
  onClick: action('Tab clicked'),
  active: true,
}

export const InactiveTab = Template.bind({})
InactiveTab.args = {
  icon: tabMobileInactiveFreeboard,
  label: '자유게시판',
  onClick: action('Tab clicked'),
  active: false,
}

import MobileHeader from '../components/app/MobileHeader'
import MobileArrowIcon from '../assets/icons/mobile/mobile_header_arrow.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/app/MobileHeader',
  component: MobileHeader,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: MobileArrowIcon,
    label: '글 작성',
    onClick: action('클릭액션'),
  },
}
const Template = (args) => <MobileHeader {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: MobileArrowIcon,
  label: '뒤로가기 화살표',
  onClick: action('클릭액션'),
}

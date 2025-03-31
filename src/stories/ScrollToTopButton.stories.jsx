import ScrollTopButton from '../components/web/ScrollToTopButton'
import arrowUpIcon from '../assets/icons/common/common_arrow_up.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/web/ScrollTopButton',
  component: ScrollTopButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: arrowUpIcon, // 아이콘 경로 설정
    onClick: action('클릭액션'), // 클릭 액션 설정
  },
}

const Template = (args) => <ScrollTopButton {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: arrowUpIcon, // 아이콘 경로 설정
  onClick: action('클릭액션'), // 클릭 액션 설정
}

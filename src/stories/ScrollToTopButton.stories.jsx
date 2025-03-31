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
    icon: arrowUpIcon,
    onClick: action('클릭액션'),
  },
}

const Template = (args) => <ScrollTopButton {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: arrowUpIcon,
  onClick: action('클릭액션'),
}

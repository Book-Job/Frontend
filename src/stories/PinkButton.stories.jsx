import PinkButton from '../components/web/PinkButton'
import { action } from '@storybook/addon-actions'

export default {
  title: 'components/web/PinkButton',
  component: PinkButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: '로그인',
    onClick: action('클릭액션'),
  },
}

const Template = (args) => <PinkButton {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: action('클릭액션'),
}

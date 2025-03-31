import CreatePostButton from '../components/web/CreatePostButton'
import pencilIcon from '../assets/icons/common/common_pencil.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/web/CreatePostButton',
  component: CreatePostButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: pencilIcon,
    label: '글 작성',
    onClick: action('클릭액션'),
  },
}

const Template = (args) => <CreatePostButton {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: pencilIcon,
  label: '글 작성',
  onClick: action('클릭액션'),
}

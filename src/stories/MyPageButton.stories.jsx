import MyPageButton from '../components/web/MyPageButton'
import pencilIcon from '../assets/icons/common/common_pencil.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/web/MyPageButton',
  component: MyPageButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: pencilIcon,
    label: '내 정보',
    onClick: action('클릭액션'),
  },
}

const Template = (args) => <MyPageButton {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '내가 작성한 글',
  icon: pencilIcon,
  onClick: action('클릭액션'),
}

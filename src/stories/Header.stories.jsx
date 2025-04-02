import Header from '../components/web/Header'
import { action } from '@storybook/addon-actions'

export default {
  title: 'components/web/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  args: {
    login: '',
    onClick: action('클릭액션'),
  },
}

export const Default = (args) => <Header {...args} />

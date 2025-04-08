import { action } from '@storybook/addon-actions'
import MobileMainHeader from '../components/app/MobileMainHeader'

export default {
  title: 'components/app/MobileMainHeader',
  component: MobileMainHeader,
  args: {
    login: '',
    onClick: action('클릭액션'),
  },
}

export const Default = (args) => <MobileMainHeader {...args} />

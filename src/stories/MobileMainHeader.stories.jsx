import { action } from '@storybook/addon-actions'
import MobileMainHeader from '../components/app/MobileMainHeader'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'components/app/MobileMainHeader',
  component: MobileMainHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    login: '',
    onClick: action('클릭액션'),
  },
}

export const Default = (args) => <MobileMainHeader {...args} />

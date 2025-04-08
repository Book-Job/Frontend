import Header from '../components/web/Header'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/web/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    login: '',
    onClick: action('클릭액션'),
  },
}

export const Default = (args) => <Header {...args} />

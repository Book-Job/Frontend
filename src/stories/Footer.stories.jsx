import { action } from '@storybook/addon-actions'
import Footer from '../components/web/Footer'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'components/web/Footer',
  component: Footer,
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
    email: 'bookjob@gmail.com',
    onClick: action('클릭액션'),
  },
}

const Template = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  email: 'bookjob@gmail.com',
  onClick: action('클릭액션'),
}

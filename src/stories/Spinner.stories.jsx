import Spinner from '../components/web/Spinner'
const meta = {
  title: 'components/web/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: { type: 'number' }, defaultValue: 48 },
    color: {
      control: 'select',
      defaultValue: 'main-pink',
    },
  },
}

export default meta

export const Default = {
  args: {
    size: 48,
    color: 'main-pink',
  },
}

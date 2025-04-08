import Skeleton from '../components/web/Skeleton'

export default {
  title: 'components/web/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' },
    className: { control: 'text' },
  },
}

const Template = (args) => <Skeleton {...args} />

export const Default = Template.bind({})
Default.args = {
  width: '100%',
  height: '16px',
  borderRadius: '4px',
}

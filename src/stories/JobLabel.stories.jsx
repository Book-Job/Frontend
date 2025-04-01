import JobLabel from '../components/web/JobLabel'

export default {
  title: 'Components/web/JobLabel',
  component: JobLabel,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: '닉네임',
    dot: false,
  },
}

const Template = (args) => <JobLabel {...args} />

export const Default = Template.bind({})
export const WithDot = Template.bind({})
WithDot.args = {
  dot: true,
}

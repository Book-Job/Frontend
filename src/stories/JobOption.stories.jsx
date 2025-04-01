import JobOption from '../components/web/JobOption'

export default {
  title: 'Components/web/JobOption',
  component: JobOption,
  parameters: {
    layout: 'centered',
  },
  args: {
    optionTitle: '근무형태',
    optionAnswer: '풀타임',
  },
}

const Template = (args) => <JobOption {...args} />

export const Default = Template.bind({})

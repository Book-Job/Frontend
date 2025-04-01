import JobInputBox from '../components/web/JobInputBox'

export default {
  title: 'Components/web/JobInputBox',
  component: JobInputBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'ex) 아이들나라 편집자 구해요',
  },
}
const Template = (args) => <JobInputBox {...args} />
export const Default = Template.bind({})

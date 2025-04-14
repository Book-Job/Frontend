import BoardCategory from '../components/web/BoardCategory'

export default {
  title: 'components/web/BoardCategory',
  component: BoardCategory,
  parameters: {
    layout: 'centered',
  },
}

const Template = (args) => <BoardCategory {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '자유게시판',
  bgColor: '#ECFDF5',
}

export const 구인 = Template.bind({})
구인.args = {
  label: '구인',
  bgColor: '#EBF7FF',
  labelColor: '#2563EB',
  width: '60px',
}

export const 구직 = Template.bind({})
구직.args = {
  label: '구직',
  bgColor: '#FFEFEB',
  labelColor: '#DC2626',
  width: '60px',
}

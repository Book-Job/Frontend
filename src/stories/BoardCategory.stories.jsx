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
Default.args = { label: '자유게시판' }

export const 구인 = Template.bind({})
구인.args = { label: '구인' }

export const 구직 = Template.bind({})
구직.args = { label: '구직' }

import { action } from '@storybook/addon-actions'
import MobileFreeBoard from '../components/app/MobileFreeBoard'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'components/app/MobileFreeBoard',
  component: MobileFreeBoard,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: '경력직 이직 관력 질문이여',
    content: '무하하하하하하하',
    onClick: action('클릭액션'),
    name: '하하호호',
    date: '2020-11-11',
    comment1: 11,
    view1: 11,
  },
}

const Template = (args) => (
  <MemoryRouter>
    <MobileFreeBoard {...args} />
  </MemoryRouter>
)

export const Test = Template.bind({})
Test.args = {
  title: '경력직 이직 관력 질문이여ㅇㅇㅇㄹㄹㄹㄹㄹㄹㄹㅇ',
  content:
    '무하하하하하하ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ하',
  onClick: action('클릭액션'),
  name: '하하호호',
  date: '2020-11-11',
  commentCount: 11,
  viewCount: 11,
}

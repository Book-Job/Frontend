import { action } from '@storybook/addon-actions'
import FreeBoard from '../components/web/FreeBoard'
import { MemoryRouter } from 'react-router-dom' // MemoryRouter import 추가

export default {
  title: 'components/web/Freeboard',
  component: FreeBoard,
  args: {
    title: '경력직 이직 관련 질문',
    content: '무하하하하하하하',
    onClick: action('클릭액션'),
    name: '하하호호',
    date: '2020-11-11',
    comment1: 11,
    view1: 11,
  },
  parameters: {
    layout: 'centered',
  },
}

const Template = (args) => (
  <MemoryRouter>
    <FreeBoard {...args} />
  </MemoryRouter>
)

export const Test = Template.bind({})
Test.args = {
  title: '경력직 이직 관련 질문 수정',
  content: '무하하하하하하ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ하',
  onClick: action('클릭액션'),
  name: '하하호호',
  date: '2020-11-11',
  comment1: 11,
  view1: 11,
}

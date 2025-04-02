import { action } from '@storybook/addon-actions'
import FreeBoard from '../components/web/FreeBoard'

export default {
  title: 'components/web/Freeboard',
  component: FreeBoard,
  args: {
    title: '경력직 이직 관력 질문이여',
    content: '무하하하하하하하',
    onClick: action('클릭액션'),
    name: '하하호호',
    date: '2020-11-11',
  },
  parameters: {
    layout: 'centered',
  },
}

// export const Default = (args) => <FreeBoard {...args} />
const Template = (args) => <FreeBoard {...args} />

export const Test = Template.bind({})
Test.args = {
  title: '경력직 이직 관력 질문이여ㅇㅇㅇㅇ',
  content:
    '무하하하하하하ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ하',
  onClick: action('클릭액션'),
  name: '하하호호',
  date: '2020-11-11',
}

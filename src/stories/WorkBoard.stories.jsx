import WorkBoard from '../components/web/WorkBoard';
import { action } from '@storybook/addon-actions';


export default {
  title: 'components/web/WorkBoard',
  component: WorkBoard,
  args: {
    title: '외주 줍니다...',
    onClick: action('클릭액션'),
    name: '하하호호', 
    date: '2020-11-11', 
    like: true,
  },
}

// export const Default = (args) => <WorkBoard {...args} />
const Template = (args) => <WorkBoard {...args} />

export const Test = Template.bind({})
Test.args = {
  title: '외주 줍니다...',
  onClick: action('클릭액션'),
  name: '하하호호', 
  date: '2020-11-11', 
  like: true,
}

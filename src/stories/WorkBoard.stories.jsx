import WorkBoard from '../components/web/WorkBoard'
import { action } from '@storybook/addon-actions'

export default {
  title: 'components/web/WorkBoard',
  component: WorkBoard,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: '외주 줍니다...',
    onClick: action('클릭액션'),
    name: '하하호호', 
    view: 122 ,
    date: '2020-11-11', 
    like: true,
    popular1: true,
    joboffer1: true,
    history1: true,
    jobsearch1: true,
    othersite1: true,
    worktype1: true,
    
  },
}

// export const Default = (args) => <WorkBoard {...args} />
const Template = (args) => <WorkBoard {...args} />

export const Test = Template.bind({})
Test.args = {
  title: '외주 줍니다...',
  onClick: action('클릭액션'),
  name: '하하호호', 
  view: 122 , 
  date: '2020-11-11', 
  like: true,
  popular1: true,
  joboffer1: true,
  history1: true,
  jobsearch1: true,
  othersite1: true,
  worktype1: true,
}

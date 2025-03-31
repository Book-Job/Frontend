// import { action } from '@storybook/addon-actions';
import WorkBoard from '../components/web/WorkBoard';


export default {
  title: 'components/web/WorkBoard',
  component: WorkBoard,
  args: {
    title: '외주 줍니다...',
    // onClick: action('클릭액션'),
  },
}

export const Default = (args) => <WorkBoard {...args} />

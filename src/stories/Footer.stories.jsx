import { action } from '@storybook/addon-actions';
import Footer from '../components/web/Footer';


export default {
  title: 'components/web/Footer',
  component: Footer,
  args: {
    email: 'bookjob@gmail.com',
    onClick: action('클릭액션'),
  },
}

export const Default = (args) => <Footer {...args} />

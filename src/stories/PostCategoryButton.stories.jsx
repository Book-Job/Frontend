import PostCategoryButton from '../components/common/admin/PostCategoryButton'
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/common/admin/PostCategoryButton',
  component: PostCategoryButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    argTypes: {
      categories: { control: 'array' },
    },
  },
}

const Template = (args) => <PostCategoryButton {...args} />

export const Default = Template.bind({})
Default.args = {
  categories: ['전체 글', '구인 글', '구직 글', '자유글'],
  onClick: action('클릭액션'),
}

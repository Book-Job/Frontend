import DateFilterButtons from '../components/common/admin/DateFilterButtons'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/common/admin/DateFilterButtons',
  component: DateFilterButtons,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    argTypes: {
      dateFilter: { dateFilter: 'array' },
    },
  },
}

const Template = (args) => <DateFilterButtons {...args} />

export const Default = Template.bind({})
Default.args = {
  dateFilter: ['일간', '주간', '월간', '전체'],
  onClick: action('클릭액션'),
}

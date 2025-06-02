import TagIcon from '../components/web/TagIcon'
import joboffer from '../assets/icons/common/common_tag_ joboffer.svg'
import history from '../assets/icons/common/common_tag_history.svg'
import jobsearch from '../assets/icons/common/common_tag_jobsearch.svg'
import othersite from '../assets/icons/common/common_tag_othersite.svg'
import popular from '../assets/icons/common/common_tag_popular.svg'
import worktype from '../assets/icons/common/common_tag_worktype.svg'
export default {
  title: 'components/web/TagIcon',
  component: TagIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: [joboffer, history, jobsearch, othersite, popular, worktype],
    },
    label: { control: 'text' },
  },
}
const Template = (args) => <TagIcon {...args} />

export const JobofferTag = Template.bind({})
JobofferTag.args = {
  label: '구인',
  icon: joboffer,
}

export const Career = Template.bind({})
Career.args = {
  label: '경력',
  icon: history,
}

export const JobSearch = Template.bind({})
JobSearch.args = {
  label: '구직',
  icon: jobsearch,
}

export const OtherSite = Template.bind({})
OtherSite.args = {
  label: '외부 사이트',
  icon: othersite,
}

export const Popular = Template.bind({})
Popular.args = {
  label: '인기 글',
  icon: popular,
}

export const Worktype = Template.bind({})
Worktype.args = {
  label: '정규직',
  icon: worktype,
}

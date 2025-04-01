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
//구인 tag
export const JobofferTag = Template.bind({})
JobofferTag.args = {
  label: '구인',
  icon: joboffer,
}
//경력 tag
export const Career = Template.bind({})
Career.args = {
  label: '경력',
  icon: history,
}
//구직 tag
export const JobSearch = Template.bind({})
JobSearch.args = {
  label: '구직',
  icon: jobsearch,
}
//외부 사이트 tag
export const OtherSite = Template.bind({})
OtherSite.args = {
  label: '외부 사이트',
  icon: othersite,
}
//인기글 tag
export const Popular = Template.bind({})
Popular.args = {
  label: '인기 글',
  icon: popular,
}
//정규직 tag
export const Worktype = Template.bind({})
Worktype.args = {
  label: '정규직',
  icon: worktype,
}

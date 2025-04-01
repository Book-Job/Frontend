import ShareViews from '../components/web/ShareViews'
import viewPink from '../assets/icons/common/common_view_pink.svg'
import viewGray from '../assets/icons/common/common_view_gray.svg'
import share from '../assets/icons/common/common_share.svg'
import link from '../assets/icons/common/common_link.svg'
import comment from '../assets/icons/common/comment.svg'

export default {
  title: 'Components/web/Share',
  component: ShareViews,
  argTypes: {
    icon: {
      control: 'select',
      options: [viewPink, viewGray, share,comment,link],
    },
    label: { control: 'text' },
    textColor: { control: 'text' },
    weblink: { control: 'text' },
  },
}

const Template = (args) => <ShareViews {...args} />

export const share1 = Template.bind({})
share1.args = {
  label: '공유',
  textColor: 'text-[#8E8E8E]',
  icon: share,
}
export const view = Template.bind({})
view.args = {
  label: '123',
  textColor: 'text-[#E36397]',
  icon: viewPink,
}
export const comment1 = Template.bind({})
comment1.args = {
  label: '223',
  textColor: 'text-[#8E8E8E]',
  icon: comment,
}
export const link1 = Template.bind({})
link1.args = {
  label: '북에디터',
  textColor: 'text-[#8E8E8E]',
  icon: link,
  weblink: "http://bookeditor.org/main/main.php",
}

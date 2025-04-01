import PropTypes from 'prop-types'
import TagIcon from './TagIcon'
import joboffer from '../../assets/icons/common/common_tag_ joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import othersite from '../../assets/icons/common/common_tag_othersite.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import ShareViews from './ShareViews'
const WorkBoard = ({ title, name, date, like }) => {
  return (
    <div className='w-[300px] h-[200px]'>
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] p-[25px] justify-between'>
        <div className='flex-row'>
          <div className='flex gap-2 mb-2'>
            {/* <TagIcon label='인기 글' icon={popular} /> */}
            <TagIcon label='구인' icon={joboffer} />
            <TagIcon label='경력' icon={history} />
            {/* <TagIcon label='구직' icon={jobsearch} /> */}
            {/* <TagIcon label='외부 사이트' icon={othersite} /> */}
            <TagIcon label='정규직' icon={worktype} />
          </div>
          <div className='text-[18px] font-bold'>{title}</div>
        </div>
        <div className='flex-row  text-[#8E8E8E] text-[14px]'>
          <div className='flex justify-end font-bold '>이름{name}</div>
          <hr className='border-[#8E8E8E] my-2' />
          <div className='flex justify-between'>
            2025-03-05{date}
            <ShareViews label='123' textColor='text-[#E36397]' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

WorkBoard.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
export default WorkBoard


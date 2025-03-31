import PropTypes from 'prop-types'
import TagIcon from './TagIcon'
import joboffer from '../../assets/icons/common/common_tag_ joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import othersite from '../../assets/icons/common/common_tag_othersite.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
const WorkBoard = ({ title, name, date, like }) => {
  return (
    <div className='w-[300px] h-[200px]'>
      <div className=' h-full  border border-[#D6D6D6] rounded-[10px] p-[25px]'>
        <div className='flex gap-2'>
          <TagIcon label='인기 글' icon={popular} />
          <TagIcon label='구인' icon={joboffer} />
          <TagIcon label='경력' icon={history} />
          <TagIcon label='구직' icon={jobsearch} />
          <TagIcon label='외부 사이트' icon={othersite} />
          <TagIcon label='정규직' icon={worktype} />
        </div>

        <div className=''>{title}</div>
      </div>
    </div>
  )
}

WorkBoard.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
export default WorkBoard

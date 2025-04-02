import JobLabel from '../../../../components/web/JobLabel'
import JobFormLine from '../../common/components/JobFormLine'

const WriteJobSearchPostingForm = () => {
  return (
    <>
      <div className='flex items-center gap-[1px] w-full mt-[21px]'>
        <JobLabel label='구인 / 구직' dot={true} />
        <select className='border p-2 rounded-md w-[157px] h-[58px] cursor-pointer'>
          <option value='구인'>구인</option>
          <option value='구직'>구직</option>
        </select>
      </div>
      <JobFormLine />
    </>
  )
}

export default WriteJobSearchPostingForm

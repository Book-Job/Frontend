import JobLabel from '../../../../components/web/JobLabel'
import JobFormLine from '../../common/components/JobFormLine'
import JobInputBox from '../../../../components/web/JobInputBox'

const FormItem = ({ label, dot }) => (
  <>
    <div className='flex'>
      <JobLabel label={label} dot={dot} />
    </div>
    <JobFormLine />
  </>
)

const WriteRecruitmentPostingForm = () => {
  return (
    <>
      <FormItem label='구인 / 구직' dot={true}>
        <select className='border p-2 rounded-md w-[157px] h-[58px] cursor-pointer'>
          <option value='구인'>구인</option>
          <option value='구직'>구직</option>
        </select>
      </FormItem>
      <FormItem label='글 제목' dot={true}>
        <JobInputBox placeholder='ex) 아이들나라 편집자 구해요' />
      </FormItem>
      <FormItem label='구인마감' dot={false}>
        <JobInputBox placeholder='미선택시 채용시 마감으로 자동 입력됩니다.' />
      </FormItem>
      <FormItem label='근무지역' dot={true}>
        <JobInputBox placeholder='ex) 강남구~  xxx ' />
      </FormItem>
      <FormItem label='근무형태' dot={false}>
        <JobInputBox placeholder='ex) 신입 / 경력 3~5 년' />
      </FormItem>
      <FormItem label='직군' dot={true}>
        <JobInputBox placeholder='gildong@naver.com' />
      </FormItem>{' '}
      <FormItem label='경력' dot={true}>
        <JobInputBox placeholder='gildong@naver.com' />
      </FormItem>
      <div className='flex'>
        <JobLabel label='내용' dot={true} />
      </div>
    </>
  )
}

export default WriteRecruitmentPostingForm

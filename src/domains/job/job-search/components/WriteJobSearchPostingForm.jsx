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

const WriteJobSearchPostingForm = () => {
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

      <FormItem label='근무형태' dot={false}>
        <select className='border p-2 rounded-md w-[157px] h-[58px] cursor-pointer'>
          <option value='정규직'>정규직</option>
          <option value='계약직'>계약직</option>
          <option value='인턴'>인턴</option>
        </select>
      </FormItem>

      <FormItem label='직군' dot={true}>
        <select className='border p-2 rounded-md w-[157px] h-[58px] cursor-pointer'>
          <option value='편집자'>편집자</option>
          <option value='디자이너'>디자이너</option>
          <option value='일러스트레이터'>일러스트레이터</option>
        </select>
      </FormItem>

      <FormItem label='경력' dot={false}>
        <JobInputBox placeholder='ex) 신입 / 경력 3~5 년' />
      </FormItem>

      <FormItem label='연락 가능한 이메일' dot={true}>
        <JobInputBox placeholder='gildong@naver.com' />
      </FormItem>

      <div className='flex'>
        <JobLabel label='내용' dot={true} />
      </div>
    </>
  )
}

export default WriteJobSearchPostingForm

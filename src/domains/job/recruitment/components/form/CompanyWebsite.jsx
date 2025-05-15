import FormItem from '../../../common/components/FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'
const CompanyWebsite = ({ register }) => {
  return (
    <FormItem label='회사 웹사이트' dot={false} register={register} name='websiteUrl'>
      <JobInputBox
        type='text'
        placeholder='자사 웹사이트 url을 넣어주세요'
        {...register('websiteUrl')}
      />
    </FormItem>
  )
}
export default CompanyWebsite

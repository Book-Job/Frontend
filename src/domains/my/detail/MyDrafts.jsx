import PageTitle from '../../Find/common/components/PageTitle'
import MyDraftsList from './components/MyDraftsList'

const MyDrafts = () => {
  const draftsListData = [
    { id: 1, title: '제목을 작성중이다.', content: '내용을 작성중이다.', date: '2020-12-12' },
    { id: 2, title: '제목을 작성중이다2.', content: '내용을 작성중이다2.', date: '2022-12-12' },
  ]
  return (
    <div>
      <PageTitle title={'임시저장 글'} />
      <MyDraftsList draftsListData={draftsListData} />
    </div>
  )
}

export default MyDrafts

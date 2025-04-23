import WorkBoard from '../../../components/web/WorkBoard'
import PageTitle from '../../Find/common/components/PageTitle'

const MyScrap = () => {
  const scrapList = [
    {
      id: 1,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
    {
      id: 2,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
    {
      id: 3,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
    {
      id: 4,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
    {
      id: 5,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
    {
      id: 6,
      title: '연봉 7000천 받으면서 일하실분',
      name: '여기는 북에디터',
      date: '2020-12-12',
      like: true,
      popular1: false,
      joboffer1: true,
      history1: true,
      othersite1: false,
      worktype1: true,
      view: 203,
    },
  ]
  return (
    <div>
      <PageTitle title={'스크랩'} />
      <div className='flex justify-end max-w-[932px] mx-auto'>최신 등록순</div>
      <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 max-w-[932px] mx-auto justify-items-center'>
        {scrapList.map((scrap) => (
          <WorkBoard
            key={scrap.id}
            title={scrap.title}
            name={scrap.name}
            date={scrap.date}
            like={scrap.like}
            popular1={scrap.popular1}
            joboffer1={scrap.joboffer1}
            history1={scrap.history1}
            othersite1={scrap.othersite1}
            worktype1={scrap.worktype1}
            view={scrap.view}
          />
        ))}
      </div>
    </div>
  )
}

export default MyScrap

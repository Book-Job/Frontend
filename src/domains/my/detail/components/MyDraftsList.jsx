const MyDraftsList = ({ draftsListData }) => {
  return (
    <div>
      {draftsListData.map((item, index) => (
        <div key={index}>
          <div className='sm:text-[30px] font-semibold flex justify-start mb-[30px] mt-[40px] text-[20px]'>
            {item.title}
          </div>
          <div className='flex sm:text-[24px] text-[16px] '>{item.content}</div>
          <div className='flex justify-between my-[24px]'>
            <span className='text-main-pink sm:text-[20px] text-[14px]'>{item.date}</span>
            <span className='text-dark-gray sm:text-[24px] text-[14px]'>삭제</span>
          </div>
          <div className='border border-light-gray'></div>
        </div>
      ))}
    </div>
  )
}

export default MyDraftsList

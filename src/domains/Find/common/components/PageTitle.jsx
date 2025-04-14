const PageTitle = ({ title, subTitle }) => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='flex text-[38px] font-bold'>{title}</div>
        <div className='flex mt-8 text-2xl font-medium text-dark-gray'>{subTitle}</div>
      </div>
    </div>
  )
}

export default PageTitle

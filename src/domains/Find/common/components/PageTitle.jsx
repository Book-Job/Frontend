const PageTitle = ({ title, subTitle }) => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='flex sm:text-[38px] text-2xl font-bold'>{title}</div>
        <div className='flex my-8 text-lg font-medium sm:text-2xl text-dark-gray'>{subTitle}</div>
      </div>
    </div>
  )
}

export default PageTitle

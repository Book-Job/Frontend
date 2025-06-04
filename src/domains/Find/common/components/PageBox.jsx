const PageBox = ({ children }) => {
  return (
    <div className='border rounded-[5px] border-dark-gray sm:px-10 px-5 py-7 sm:py-14  w-full max-w-[657px]'>
      {children}
    </div>
  )
}

export default PageBox

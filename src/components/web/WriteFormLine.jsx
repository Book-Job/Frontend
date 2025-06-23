const WriteFormLine = () => {
  return (
    <div className='flex w-full max-w-[940px] mx-auto my-[15px]'>
      <div
        className='
          h-[3px] bg-main-pink mr-4
          flex-shrink-0
          basis-[20%] sm:basis-[150px]
          '
      />
      <div
        className='
          h-[3px] bg-dark-gray
          flex-grow
          basis-[80%] sm:basis-auto
          '
      />
    </div>
  )
}
export default WriteFormLine

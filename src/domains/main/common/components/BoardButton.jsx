const BoardButton = () => {
  const boardButton = [
    {
      name: '자유',
      path: '/',
    },
    {
      name: '구인구직',
      path: '/',
    },
  ]
  return (
    <div className="flex justify-center">
      <div className="flex gap-2">
        {boardButton.map(({ name, path }, index) => {
          return (
            <button
              key={index}
              className='bg-light-gray w-[157px] h-[47px] border rounded-full text-2xl'
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BoardButton

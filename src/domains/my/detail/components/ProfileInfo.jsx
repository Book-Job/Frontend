const ProfileInfo = ({title,content,edit,text}) => {
  return (
    <div>
      <div className='text-[22px] font-semibold flex mb-5'>{title}</div>
      <div className='flex justify-between py-2 text-lg border-b border-dark-gray'>
        <span>{content}</span>
        {edit ? (
          <button className="font-bold text-main-pink">{edit}</button>
        ) : (
          <span className="font-bold text-main-pink">{text || ''}</span>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo

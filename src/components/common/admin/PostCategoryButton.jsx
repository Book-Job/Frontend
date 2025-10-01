const PostCategoryButton = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <button key={category} className='pr-3 text-xl hover:text-hover-pink'>
          {category}
        </button>
      ))}
    </div>
  )
}

export default PostCategoryButton

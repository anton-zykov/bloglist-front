import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './BlogTitle'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

const AllBlogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const newBlogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='Create new blog' ref={newBlogFormRef}>
        <NewBlogForm
          user={user}
          toggleVisibility={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default AllBlogs

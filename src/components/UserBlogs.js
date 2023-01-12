import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
  const userId = useParams().id
  const blogs = useSelector((state) =>
    state.blogs.filter((b) => b.user.id === userId)
  )

  if (!blogs.length) {
    return null
  } else {
    return (
      <div>
        <h2>{blogs[0].user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UserBlogs

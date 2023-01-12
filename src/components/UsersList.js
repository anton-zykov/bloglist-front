import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsByUser = new Array()
  blogs.forEach((blog) => {
    if (!blogsByUser.find((b) => b.creatorUser === blog.user.name)) {
      blogsByUser.push({
        creatorUser: blog.user.name,
        creatorUserId: blog.user.id,
        blogCount: blogs.reduce((sum, b) => {
          return b.user.name === blog.user.name ? sum + 1 : sum
        }, 0),
      })
    }
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {blogsByUser.map((blog) => (
            <tr key={blog.creatorUser}>
              <td>
                <Link to={`/users/${blog.creatorUserId}`}>
                  {blog.creatorUser}
                </Link>
              </td>
              <td>{blog.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList

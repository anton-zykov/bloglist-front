import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} by {blog.author} 
        {detailsVisible ?
          <button style={{ margin: 5 }} onClick={() => setDetailsVisible(false)}>Hide details</button>
          : <button style={{ margin: 5 }} onClick={() => setDetailsVisible(true)}>Show details</button>
        } </p>
      </div>
      {detailsVisible ?
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => undefined}>Like</button></p>
          <p>{blog.user.name}</p>
        </div>
        : ''
      }
    </div>
  )
}

export default Blog
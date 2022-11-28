import { useState } from 'react'

const Blog = ({ blog, user, handleLikeIncreaseParentFunction, handleBlogDeleteParentFunction, blogs, setBlogs }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleLikeIncrease = async (event) => {
    event.preventDefault()
    if (await handleLikeIncreaseParentFunction(blog)) {
      const unsortedBlogs = blogs.map((b) => 
        b.title === blog.title ? { ...blog, likes: blog.likes + 1 } : b
      )
      setBlogs(unsortedBlogs.sort((a, b) => b.likes - a.likes))
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    if (await handleBlogDeleteParentFunction(blog)) {
      const updatedBlogs = blogs.filter((b) => 
        b.title !== blog.title
      )
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
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
          <p>Likes: {blog.likes} <button onClick={handleLikeIncrease}>Like</button></p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username ?
            <p><button onClick={handleBlogDelete}>Remove</button></p>
            : ''
          }
        </div>
        : ''
      }
    </div>
  )
}

export default Blog
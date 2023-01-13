import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { like, remove, comment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogIndividual = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogId = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === blogId)
  const user = useSelector((state) => state.user)
  const [commentText, setComment] = useState('')

  const handleLikeIncrease = async (event) => {
    event.preventDefault()

    try {
      await dispatch(like(blog))
      dispatch(
        setNotification(`You liked ${blog.title} by ${blog.author}.`, true, 5)
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, false, 5))
      console.log(error.response.data.error)
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    if (
      window.confirm(
        `Please confirm removing blog ${blog.title} by ${blog.author}.`
      )
    ) {
      try {
        navigate('/')
        await dispatch(remove(blog, user))
        dispatch(
          setNotification(
            `${blog.title} by ${blog.author} was successfully deleted.`,
            true,
            5
          )
        )
      } catch (error) {
        dispatch(setNotification(error.response.data.error, false, 5))
        console.log(error.response.data.error)
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await dispatch(comment(blogId, commentText))
    } catch (error) {
      console.log('are we here')
      dispatch(setNotification(error.response.data.error, false, 5))
      console.log(error.response.data.error)
    }
  }

  if (!blogs.length) {
    return null
  } else {
    return (
      <div className='blog'>
        <h3>
          {blog.title} by {blog.author}
        </h3>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}{' '}
          <button id='likeButton' onClick={handleLikeIncrease}>
            Like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username ? (
          <p>
            <button id='removeButton' onClick={handleBlogDelete}>
              Remove
            </button>
          </p>
        ) : (
          ''
        )}
        <h3>Comments</h3>
        <form onSubmit={handleComment} id='commentForm'>
          <input
            type='text'
            value={commentText}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>Comment</button>
        </form>
        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default BlogIndividual

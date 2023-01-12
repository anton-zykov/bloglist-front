import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { like, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogIndividual = () => {
  const dispatch = useDispatch()
  const userId = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find(
    (b) => b.id === userId
  )
  const user = useSelector((state) => state.user)

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
  if (!blogs.length) {
    return null
  } else {
    return (
      <div className='blog'>
        <p>
          {blog.title} by {blog.author}
        </p>
        <p>{blog.url}</p>
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
      </div>
    )
  }
}

export default BlogIndividual

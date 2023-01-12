import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = ({ user, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreationOfBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    try {
      await dispatch(createBlog(newBlog, user))
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added.`,
          true,
          5
        )
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleVisibility()
    } catch (error) {
      dispatch(setNotification(error.response.data.error, false, 5))
      console.log(error.response.data.error)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreationOfBlog}>
        <div>
          Title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm

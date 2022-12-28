import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        setNotification(
          error.response.data.error, false, 5
        )
      )
      console.log(error)
    }
  }

  const newBlogFormRef = useRef()

  const handleCreationOfBlog = async (newBlog) => {
    try {
      const processedNewBlog = await blogService.createNewBlog(newBlog, user)
      setBlogs(blogs.concat(processedNewBlog))
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added.`, true, 5
        )
      )
      newBlogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      dispatch(
        setNotification(
          error.response.data.error, false, 5
        )
      )
      console.log(error.response.data.error)
      return false
    }
  }

  const handleLikeIncrease = async (blog) => {
    try {
      await blogService.increaseLikes(blog)
      dispatch(
        setNotification(
          `You liked ${blog.title} by ${blog.author}.`, true, 5
        )
      )
      return true
    } catch (error) {
      dispatch(
        setNotification(
          error.response.data.error, false, 5
        )
      )
      console.log(error.response.data.error)
    }
  }

  const handleBlogDelete = async (blog) => {
    if (
      window.confirm(
        `Please confirm removing blog ${blog.title} by ${blog.author}.`
      )
    ) {
      try {
        await blogService.deleteBlog(blog.id, user)
        dispatch(
          setNotification(
            `${blog.title} by ${blog.author} was successfully deleted.`, true, 5
          )
        )
        return true
      } catch (error) {
        dispatch(
          setNotification(
            error.response.data.error, false, 5
          )
        )
        console.log(error.response.data.error)
      }
    }
  }

  if (user !== null) {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Welcome, {user.name}!</p>
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedUser')
            window.location.reload(false)
          }}
        >
          Logout
        </button>

        <Notification />

        <Togglable buttonLabel='Create new blog' ref={newBlogFormRef}>
          <NewBlogForm
            handleCreationOfBlogParentFunction={handleCreationOfBlog}
          />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleLikeIncreaseParentFunction={handleLikeIncrease}
            handleBlogDeleteParentFunction={handleBlogDelete}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
}

export default App

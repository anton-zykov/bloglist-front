import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { SuccessNotification, ErrorNotification } from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
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
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error)
    }
  }
  
  const newBlogFormRef = useRef()

  const handleCreationOfBlog = async (newBlog) => {
    try {
      await blogService.createNewBlog(newBlog, user)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      newBlogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error.response.data.error)
      return false
    }
  }

  if (user !== null) {
    return (
      <div>
        <h2>Blogs</h2>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedUser')
          }}>Logout</button>

          <SuccessNotification message={successMessage} />
          <ErrorNotification message={errorMessage} />
          
          <Togglable buttonLabel='Create new blog' ref={newBlogFormRef}>
            <NewBlogForm
              handleCreationOfBlogParentFunction={handleCreationOfBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in to application</h2>

        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />

        <LoginForm 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin} />
      </div>
    )
  }
}

export default App

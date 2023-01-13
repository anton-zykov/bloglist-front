import './index.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import AllBlogs from './components/AllBlogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/userReducer'
import UsersList from './components/UsersList'
import UserBlogs from './components/UserBlogs'
import BlogIndividual from './components/BlogIndividual'
import Menu from './components/Menu'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  if (user) {
    return (
      <div className='container'>
        <Menu />

        <h2>Blog App</h2>

        <Notification />
        <Routes>
          <Route path='/users/:id' element={<UserBlogs />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/blogs/:id' element={<BlogIndividual />} />
          <Route path='/' element={<AllBlogs />} />
        </Routes>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <LoginForm />
      </div>
    )
  }
}

export default App

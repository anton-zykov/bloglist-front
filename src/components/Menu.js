import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = () => {
  const user = useSelector((state) => state.user)

  const margin = {
    margin: 7,
    display: 'inline',
  }

  const menucolor = {
    backgroundColor: '#C0C0C0',
  }

  return (
    <div style={menucolor}>
      <Link to='/' style={margin}>
        Blogs
      </Link>
      <Link to='/users' style={margin}>
        Users
      </Link>
      <div style={margin}>Welcome, {user.name}!</div>
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedUser')
          window.location.reload(false)
        }}
        style={margin}
      >
        Logout
      </button>
    </div>
  )
}

export default Menu

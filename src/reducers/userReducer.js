import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    set(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(login(user))
  }
}

export const setLoggedInUser = (user) => {
  return (dispatch) => {
    dispatch(set(user))
  }
}

export const { login, set } = userSlice.actions
export default userSlice.reducer

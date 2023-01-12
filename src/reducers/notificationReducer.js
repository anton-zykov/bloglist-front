import { createSlice } from '@reduxjs/toolkit'

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', success: true },
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification(/*state, action*/) {
      return { content: '', success: true }
    },
  },
})

export const setNotification = (content, success, time) => {
  return async (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(displayNotification({ content, success }))
    timeoutID = setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export const { displayNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

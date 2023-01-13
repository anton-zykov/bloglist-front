import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      state.find((b) => b.id === action.payload.id).likes += 1
      state.sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    },
    addComment(state, action) {
      state
        .find((b) => b.id === action.payload.id)
        .comments.push(action.payload.content)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog, user) => {
  return async (dispatch) => {
    const blog = await blogService.createNewBlog(newBlog, user)
    dispatch(appendBlog(blog[0]))
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.increaseLikes(blog)
    dispatch(likeBlog(updatedBlog))
  }
}

export const remove = (blog, user) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id, user)
    dispatch(deleteBlog(blog))
  }
}

export const comment = (id, content) => {
  return async (dispatch) => {
    await blogService.comment(id, content)
    dispatch(addComment({ id, content }))
  }
}

export const { setBlogs, appendBlog, likeBlog, deleteBlog, addComment } =
  blogSlice.actions
export default blogSlice.reducer

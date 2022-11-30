import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  // eslint-disable-next-line no-unused-vars
  let container
  let mockHandler

  const user = { username: 'Test User Username' }
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      username: 'Test User Username',
    },
  }

  beforeEach(() => {
    mockHandler = jest.fn()

    container = render(
      <Blog blog={blog} handleLikeIncreaseParentFunction={mockHandler} user={user} />
    ).container
  })

  test('Short blog renders correctly', () => {
    const titleByAuthorElement = screen.getByText('Test Title by Test Author')
    const urlElement = screen.queryByText('http://testurl.com')
    const likesElement = screen.queryByText('Likes: 0')

    expect(titleByAuthorElement).toBeDefined()
    expect(urlElement).toBe(null)
    expect(likesElement).toBe(null)
  })

  test('Long blog renders correctly', async () => {
    const appUser = userEvent.setup()
    const showButton = screen.getByText('Show details')
    await appUser.click(showButton)

    const titleByAuthorElement = screen.getByText('Test Title by Test Author')
    const urlElement = screen.getByText('http://testurl.com')
    const likesElement = screen.getByText('Likes: 0')

    expect(titleByAuthorElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test('Double click on Like button is interpreted as 2 likes', async () => {
    const appUser = userEvent.setup()
    const showButton = screen.getByText('Show details')
    await appUser.click(showButton)
    const likeButton = screen.getByText('Like')
    await appUser.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
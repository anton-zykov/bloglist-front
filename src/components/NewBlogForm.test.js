import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('Correct props are passed to the creation handler', async () => {
    const createBlog = jest.fn()
    const appUser = userEvent.setup()

    const { container } = render(
      <NewBlogForm handleCreationOfBlogParentFunction={createBlog} />
    )

    const titleField = container.querySelector('#title')
    const authorField = container.querySelector('#author')
    const urlField = container.querySelector('#url')
    const createButton = screen.queryByText('Create')

    await appUser.type(titleField, 'Test Title')
    await appUser.type(authorField, 'Test Author')
    await appUser.type(urlField, 'http://testurl.com')
    await appUser.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')
  })
})

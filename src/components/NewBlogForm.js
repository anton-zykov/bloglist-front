import { useState } from 'react'

const NewBlogForm = ({ handleCreationOfBlogParentFunction }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreationOfBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    if (await handleCreationOfBlogParentFunction(newBlog)) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
  <div>
    <h2>Create new blog</h2>
    <form onSubmit={handleCreationOfBlog}>
    <div>
      Title: 
      <input type='text' value={title} name='Title'
        onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      Author: 
      <input type='text' value={author} name='Author'
        onChange={({ target }) => setAuthor(target.value)} />
    </div>
    <div>
      Url: 
      <input type='text' value={url} name='Url'
        onChange={({ target }) => setUrl(target.value)} />
    </div>
    <button type='submit'>Create</button>
    </form>
  </div>
)
}

export default NewBlogForm
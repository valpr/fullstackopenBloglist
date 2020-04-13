import React, {useState} from 'react'
const BlogForm = ({handleCreate}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleCreate({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
    <form onSubmit={addBlog}>
      <h2>create new blog</h2>

        <div>
          title:
          <input id="title" name="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} ></input>
        </div>
        <div>
          author:
          <input id="author" name="author" type="text" value={author} onChange={({target}) => setAuthor(target.value)} ></input>
        </div>
        <div>
          URL:
          <input id="url" name="url" type="text" value={url} onChange={({target}) => setUrl(target.value)} ></input>
        </div>
        <button id="newBlog" type="submit">Submit a new blog!</button>
      </form>
    )
}


export default BlogForm
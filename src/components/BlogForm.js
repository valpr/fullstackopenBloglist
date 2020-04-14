import React from 'react'
import { useField } from '../hooks/useField'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({handleCreate}) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const addBlog = (event) => {
        event.preventDefault()
        handleCreate({
            title: title.forField.value,
            author: author.forField.value,
            url: url.forField.value,
        })
        title.reset()
        author.reset()        
        url.reset()
    }
    return (
    <form onSubmit={addBlog}>
      <h2>Add a new blog!</h2>

        <div>
          
          <TextField label="Enter title" id="title" name="title" {...title.forField} ></TextField>
        </div>
        <div>
          
          <TextField label="Enter author" id="author" name="author" {...author.forField} ></TextField>
        </div>
        <div>
          
          <TextField label="URL" id="url" name="url" {...url.forField} ></TextField>
        </div>
        <Button id="newBlog" type="submit">Submit a new blog!</Button>
      </form>
    )
}


export default BlogForm
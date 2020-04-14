import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { comment } from '../reducers/blogReducer'
import { Card, Button, TextField, List, ListItem } from '@material-ui/core'

const DetailedBlogView = ({blogs, handleLike}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const blogToChoose = blogs.find(m => id === m.id)
    
    const [newComment, setNewComment] = useState('')
    if (!blogToChoose){
        return null
    }

    const pressLike = () => {
        handleLike(blogToChoose)
    }
    const handleComment = () => {
        dispatch(
            comment(
                {...blogToChoose, comments:blogToChoose.comments.concat(newComment)}))
        setNewComment('')
    }
    return (
        <Card>
            <h2>{blogToChoose.title}</h2>
            <a href={`http://${blogToChoose.url}`}>{blogToChoose.url}</a> <br/>
             <Button onClick={pressLike}>Like: {blogToChoose.likes} likes</Button> <br/>
            Added by {blogToChoose.user.name}

            <h3>Comments</h3>
            <TextField onChange={(e)=> setNewComment(e.target.value)} value={newComment} name="comments" type="text" id="comments"/>
            <Button onClick={handleComment}>add comment</Button>
            <List>
                {blogToChoose.comments.map((comment, index) => <ListItem key={index}>{comment}</ListItem>)}
            </List>
        </Card>
    )
}

export default DetailedBlogView
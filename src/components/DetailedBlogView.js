import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { comment } from '../reducers/blogReducer'

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
        <div>
            <h2>{blogToChoose.title}</h2>
            <a href={`http://${blogToChoose.url}`}>{blogToChoose.url}</a> <br/>
            {blogToChoose.likes} <button onClick={pressLike}>like</button> <br/>
            Added by {blogToChoose.user.name}

            <h3>Comments</h3>
            <input onChange={(e)=> setNewComment(e.target.value)} value={newComment} name="comments" type="text" id="comments"/>
            <button onClick={handleComment}>add comment</button>
            <ul>
                {blogToChoose.comments.map((comment, index) => <li key={index}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default DetailedBlogView
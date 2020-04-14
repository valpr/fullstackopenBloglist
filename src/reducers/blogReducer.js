import blogService from '../services/blogs'

const blogReducer = (state =[], action) => {
    switch(action.type){
        case 'INIT':
            return action.data
        case 'CREATE':
            return state.concat(action.data)
        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(n=> n.id === id)
            const likedBlog = {...blogToLike, likes: blogToLike.likes+1}
            return state.map(blog => blog.id===id ? likedBlog : blog)
        case 'DELETE':
            const toDeleteID = action.data.id
            return state.filter(blog => blog.id !== toDeleteID)
        case 'COMMENT': //TODO
            const commentID = action.data.id
            const blogToComment = state.find(n=> n.id ===commentID)
            const commentedBlog = {...blogToComment, comments:action.data.comments}
            return state.map(blog => blog.id===commentID ? commentedBlog : blog)

            default:
            return state
    }
}

export const initializeBlogs = () =>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data:blogs
        })
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const blog = await blogService.addNewBlog(blogObject)
        dispatch({
            type:'CREATE',
            data: blog
        })
    }
}
export const deleteBlog = (blogObject) => {
    return async dispatch => {
        await blogService.deleteBlog(blogObject)
        dispatch({
            type:'DELETE',
            data: blogObject
        })
    }
}

export const likeBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.modifyLikes(blogObject)
        dispatch({
            type:'LIKE',
            data: newBlog
        })
    }
}

export const comment = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.commentBlog(blogObject)
        dispatch({
            type:'COMMENT',
            data: newBlog
        })
    }
}

export default blogReducer
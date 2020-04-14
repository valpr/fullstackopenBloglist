import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state =[], action) => {
    switch(action.type){
        case 'LOGGED':
            return action.data
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const logged = (userObject) => {
    if (userObject){
        const token = userObject.token 
        blogService.setToken(token)
    }
    return dispatch => {
        dispatch({
            type:'LOGGED',
            data:userObject
        })
    }

}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({
            type:'LOGOUT'
        })
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const tryLogin = await loginService.login({
            username, password
        })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(tryLogin))
        dispatch({
            type:'LOGIN',
            data:tryLogin
        })
    }
}

export default userReducer
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import noteReducer from './reducers/noteReducer'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: noteReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
) )

export default store
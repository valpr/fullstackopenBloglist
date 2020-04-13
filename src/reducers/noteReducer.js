const noteReducer = (state = null, action) => {
    switch(action.type){
        case 'NEW':
            return state = action.message
        case 'REMOVE':
            return null
        default:
            return state
    }
}
let timeoutID;
export const newNote = (message) => {
    return async dispatch => {
        dispatch({
            type: 'NEW',
            message
        })
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE'
            })
        }, 5000)

    }
}


export default noteReducer

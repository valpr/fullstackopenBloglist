import React, {useState, useImperativeHandle} from 'react'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

const toggleVisibility = () =>{
    setVisible(!visible)
}

useImperativeHandle(ref, () => {
    return {
        toggleVisibility
    }
})

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button id="show" onClick={toggleVisibility}>show</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}

                <Button onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})
Togglable.displayName='Togglable'

export default Togglable
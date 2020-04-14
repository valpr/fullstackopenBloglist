import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'

ReactDOM.render(
<Provider store={store}>
<Router>
<Container>
<App/>

</Container>
</Router>

</Provider>
, document.getElementById('root'))
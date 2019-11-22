import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let _store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store = {_store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import { 
  BrowserRouter as Router,
} from 'react-router-dom'

ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root'))
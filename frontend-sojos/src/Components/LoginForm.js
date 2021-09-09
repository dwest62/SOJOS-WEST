import React from 'react'
import Toggable from './Toggable'
import { Container } from '@material-ui/core'
import passwordIcon from '../icons/icons8-password-50.png'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Button } from '@material-ui/core'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login(username, password))
    event.target.password.value=''
    event.target.username.value=''
    history.push('/')
  }


  
  return (
    <div>
      <Container id='loginForm'>
        <Toggable id='login-button' buttonLabel = 'log in' cancel='cancel'>
          <form onSubmit={handleLogin}>
            <div className= 'form-wrapper'>
              <div className='input-wrapper'>
                <img className='input-icon' src="https://img.icons8.com/plumpy/24/000000/user.png" alt='username'/>
                <input className='input-box' name='username' placeholder='username'/>
              </div>
              <div className='input-wrapper'>
               <img className='input-icon' src={passwordIcon} alt='password'/>
                <input className='input-box' name='password' type='password' placeholder='password'/>
              </div>
            </div>
            <Button type='submit'>login</Button>
          </form>
          <Notification />
        </Toggable>
      </Container>
    </div>
  )
}

export default LoginForm
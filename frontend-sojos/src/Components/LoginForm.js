import React from 'react'
import Toggable from './Toggable'
import { Container } from '@material-ui/core'
import passwordIcon from '../icons/icons8-password-50.png'

const LoginForm = () => {
  return (
    <div>
      <Container id='loginForm'>
        <Toggable id='login-button' buttonLabel = 'log in' cancel='cancel'>
          <form>
            <div className= 'form-wrapper'>
              <div className='input-wrapper'>
                <img className='input-icon' src="https://img.icons8.com/plumpy/24/000000/user.png" alt='username'/>
                <input className='input-box' name='username' placeholder='username'/>
              </div>
              <div className='input-wrapper'>
               <img className='input-icon' src={passwordIcon} alt='password'/>
                <input className='input-box' name='username' type='password' placeholder='password'/>
              </div>
            </div>
          </form>
        </Toggable>
      </Container>
    </div>
  )
}

export default LoginForm
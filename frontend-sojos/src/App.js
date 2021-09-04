
import React from 'react'
import Logo from './Components/Logo'
import LoginForm from './Components/LoginForm'
import userService from './services/users'
import Gathering from './Components/Gathering'
import { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'

const App = () => {
  
const [ users, setUsers ] = useState(null)

 useEffect( () => {
    userService.getAll()
    .then(response => setUsers(response))
  },[])
  
  console.log(users, 'users')
  return(
    !users
    ? <div>
        <Logo />
        <LoginForm />
      </div>
    : <div>
      <Container>
        <Gathering />
      </Container>
        
      </div>
    
  )
}

export default App
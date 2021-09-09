import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  console.log(user, 'user')

  return(
    <div className='nav-top'>
      <div id= 'nav-left'>
        <div id='welcome'>
          Welcome {user.user.firstName}!
        </div>
        <div>
          <Button onClick={()=>dispatch(logout())}>Logout</Button>
        </div>
      </div>
      <div class='nav-right'>
        <Button onClick={()=>history.push('/new-gathering')}>New Gathering</Button>
        <Button onClick={()=>history.push('/')}>Home</Button>
      </div>
      
      
    </div>
    
  )
}

export default Navigation
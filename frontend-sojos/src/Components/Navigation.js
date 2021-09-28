import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  return(
    <div className='nav-top'>
        <Button id='homebtn' onClick={()=>history.push('/')}>Home</Button>
        <Button id='archbtn' onClick={()=>history.push('/archived-gatherings')}>Archive</Button>
        <Button id='btnId' onClick={()=>dispatch(logout())}>Logout</Button>
    </div>
    
  )
}

export default Navigation
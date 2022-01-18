import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  const hideWhenVisible = { display: menu ? '' : 'none', height: menu ? 'fit-content' : '0px' }

  const handleViewOnClick = () => {
    console.log('click')
    window.open("https://docs.google.com/spreadsheets/d/1OSqUbgg77Mg1vFJDdVS_ZnpVg3kig__imE8qbvDVSp0/edit#gid=0",'_blank').focus()
  }
  return(
    <div>
      <div className='nav-top' id='desktop'>
          <Button id='homebtn' onClick={()=>history.push('/')}>Home</Button>
          <Button id='archbtn' onClick={()=>history.push('/archived-gatherings')}>Archive</Button>
          <Button id='hostbtn' onClick={() => { handleViewOnClick(); setMenu(false) }}> Schedule</Button>
          <Button id='btnId' onClick={()=>dispatch(logout())}>Logout</Button>
      </div>
      <div className='nav-top' id='mobile'>
        <Button id='menu' onClick={() => setMenu(!menu)}>
          Menu
        </Button>
      </div>
        <div id='menu-btns-wrapper' style={hideWhenVisible} >
          <Button id='homebtn' onClick={() => { history.push('/'); setMenu(false) }}>Home</Button>
          <Button id='archbtn' onClick={() => { history.push('/archived-gatherings'); setMenu(false) }}>Archive</Button>
          <Button id='hostbtn' onClick={() => { handleViewOnClick(); setMenu(false) }}> Schedule</Button>
          <Button id='btnId' onClick={()=> { dispatch(logout()); setMenu(false) }}>Logout</Button>
        </div>
    </div>
  )
}

export default Navigation
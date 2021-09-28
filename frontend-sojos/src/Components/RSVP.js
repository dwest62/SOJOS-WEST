import React from 'react'
import { Button } from '@material-ui/core'
import Toggable from './Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { addGuest } from '../reducers/gatheringReducer'
import RSVPRadio from './RSVPRadio'

const RSVP = ({gathering}) => {


  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user).user
  const notification = useSelector(state => state.notification)

  const family = users.filter(data => data.lastName === user.lastName)

  const handleAddGuest = (event) => {
    event.preventDefault()
    const name = event.target.guest.value
    const kid = event.target.kid.checked
    event.target.guest.value = ''
    event.target.kid.checked = false
    const guest = {
      username: "guest",
      lastName: user.lastName,
      firstName:name,
      kid:kid
    }
    dispatch(addGuest(gathering, guest))
  }

  return(
    <div>
      <div><strong>Please RSVP:</strong></div>
      <p>Choose yes, undecided, or no:</p>
      <div id='notification'>
        {notification}
      </div>
      <div id='rsvp'>
        {family.map( 
          data =>
           <RSVPRadio key={data.username} data={data} gathering={gathering}/>
        )}
      </div>
      <Toggable id='addGuestBtn' buttonLabel="add guest" cancel="cancel">
        <strong>Add Guest:</strong>
        <form onSubmit={handleAddGuest}>
          name:{' '}
          <input 
            name='guest' 
            placeholder='guest name'
          />
          <input
            name='kid'
            type='checkbox'
          />
          kid
          <Button type='submit'>add guest</Button>
        </form>
      </Toggable>
    </div>
  )
}

export default RSVP
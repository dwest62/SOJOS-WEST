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
        <div>
          <strong>Add Guest:</strong>
          <form onSubmit={handleAddGuest} id='addGuest'>
            name:{' '}
            <div className='input-wrapper3'>
              <input
                className='input-box2'
                name='guest' 
                placeholder='guest name'
              />
            </div>
            <div>
              <input
              name='kid'
              type='checkbox'
            />
            {' '}kid
            </div>
            <Button type='submit'>add guest</Button>
          </form>
        </div>
      </Toggable>
    </div>
  )
}

export default RSVP
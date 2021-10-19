import React from 'react'
import Toggable from './Toggable'
import { useSelector } from 'react-redux'
import RSVPRadio from './RSVPRadio'
import AddComment from './AddComment'
import AddGuest from './AddGuestForm'

const RSVP = ({gathering}) => {

  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user).user
  const notification = useSelector(state => state.notification)

  const family = users.filter(data => data.lastName === user.lastName)

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
      <Toggable id='addCommentBtn' buttonLabel="add comment" cancel="cancel">
        <AddComment gathering={gathering} />
      </Toggable>
      <div className='spacer'></div>
      <Toggable id='addGuestBtn' buttonLabel="add guest" cancel="cancel">
       <AddGuest gathering={gathering} />
      </Toggable>
    </div>
  )
}

export default RSVP
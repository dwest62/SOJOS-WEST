import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { addGuest} from '../reducers/gatheringReducer'
import { message } from '../reducers/notificationReducer'

const AddGuest = ({gathering}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user).user
 
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
    dispatch(message('Guest added!', 5))
  }

  return(
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

  )
}

export default AddGuest
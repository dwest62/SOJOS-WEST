import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByFamily } from './listHelper'
import { removeGuest } from '../reducers/gatheringReducer'

const RSVPList = ({number}) => {
  const gatherings = 
    useSelector(state => state.gatherings)
  const user =
    useSelector(state => state.user).user
  const dispatch = useDispatch()

  const rsvpStatus = (rsvp) => {
    switch(rsvp){
      case 'true':
        return 'yes'
      case 'false':
        return 'no'
      case 'undecided':
        return 'undecided'
      default: 
        return 'undecided'
    }
  }

  const delGuest = (name, family) => {
    const gath = gatherings[number]
    dispatch(removeGuest(name,family, gath))
  }

  return (
    <div>
      {sortByFamily(gatherings[number]).map(data => 
        <div key = {data.family}>
          <strong>{data.family} family {" "}</strong>
          {data.members.map(data => 
            <div>
              {data.name} {rsvpStatus(data.rsvp)}
            </div>
          )}
          {data.guests.length > 0
            ? 
              <div> 
                <strong>Guests:</strong>
                {data.guests.map(data => 
                  <div>
                    {data.name}
                    {
                      user.lastName === data.family
                        ? <Button onClick={() => delGuest(data.name, data.family)}>remove</Button>
                        : null
                    }
                  </div>
                )}
              </div>
            : null
          }
        </div>
      )}
    </div>
  )
}

export default RSVPList
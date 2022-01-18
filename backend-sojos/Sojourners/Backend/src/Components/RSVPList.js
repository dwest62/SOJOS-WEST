import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByFamily } from './listHelper'
import { removeGuest } from '../reducers/gatheringReducer'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'


const RSVPList = ({gathering}) => {
  const user =
    useSelector(state => state.user).user

  const dispatch = useDispatch()

  const rsvpStatus = (rsvp, name) => {
    switch(rsvp){
      case 'true':
        return (
          <div className='rsvpContentWrapperUp'>
            <div className='rsvpContentText'>
              {name} 
            </div>
            <div>
              <ThumbUp id='thumbup'/>
            </div>
          </div>  
        )
      case 'false':
        return (
          <div className='rsvpContentWrapperDown'>
            <div className='rsvpContentText'>
              {name} 
            </div>
            <div>
              <ThumbDown id='thumbdown'/>
            </div>
          </div>
        )
      case 'undecided':
        return (
          <div className='rsvpContentWrapperNeutral'>
            <div className='rsvpContentText'>
              {name} 
            </div>
            <div id='thumbneutral'>
              ?
            </div>
          </div>  
        )
      default:
        return (
          <div>
            <div className='rsvpContentText'>
              {name} 
            </div>
            <div id='thumbneutral'>
              ?
            </div>
          </div>  
        )
    }
  }
  const delGuest = (id, family) => {
    const gath = gathering
    dispatch(removeGuest(id,family, gath))
  }
  
  return (
    <div>
      <div className='rsvpHead'><h3>RSVP List</h3></div>
      <div className='rsvpMain'>
        {sortByFamily(gathering).map(data =>
          <div className='rsvpWrapper'key={data.family}>
          <div className='rsvpBox'>
            <div className='rsvpFamilyName'>{data.family}</div>
            {data.members.map(data => 
              <div key={data.name}>
                {rsvpStatus(data.rsvp, data.name)}
              </div>
            )}
            {data.guests.length > 0
              ? 
              <div>
                <div className='guests'> 
                  <strong>Guests:</strong>
                </div>
                  {data.guests.map(data => 
                    <div className='guestnames' key={data.id}>
                      {data.name}
                      {
                        user.lastName === data.family
                          ? <Button onClick={() => delGuest(data.id, data.family)}>remove</Button>
                          : null
                      }
                    </div>
                  )}
                </div>
              : null
            }
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RSVPList
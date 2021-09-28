import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRSVP } from '../reducers/gatheringReducer'
import ThumbsUpOutlinedIcon from '@material-ui/icons/ThumbUp'
import ThumbsDownOutlinedIcon from '@material-ui/icons/ThumbDown'
import { message } from '../reducers/notificationReducer'

const RSVPRadio = ({ data, gathering }) => {

  const [ checked, setChecked ] = 
    useState({ 
      up:false, down:false, neutral: false
    })


  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect( () => {
    const userRSVP = gathering.rsvp
      .find(datas => datas.username === data.username)
    const state = { up:false, down:false, neutral:false }
    if(userRSVP){
      switch(userRSVP.rsvp){
        case 'true':
          return setChecked({ ...state, up: true })
        case 'false':
          return setChecked({ ...state, down:true })
        default: 
          return setChecked({ ...state, neutral:true })
      } 
    } else {
        return setChecked({...state})
    }
},[gathering, data.username])

  const handleOnChange = (event) => {
    const member = event.target.name
    const person = users.find(data => data.username === member)
    const value = event.target.value
    dispatch(updateRSVP(gathering, value, person))
    const state = {up:false, down:false, neutral: false}
  
    switch(event.target.value){
      case "undecided":
        setChecked({ ...state, neutral:true })
        dispatch(message(`RSVP status for ${member} updated to undecided.`, 5))
        break;
      case "false":
        setChecked({ ...state, down:true })
        dispatch(message(`RSVP status for ${member} updated to no.`, 5))
        break;
      case "true":
        setChecked({ ...state, up:true })
        dispatch(message(`RSVP status for ${member} updated to yes.`, 5))
        break;
      default: return null
    }
  }

  const getUserRSVPstatus = (username) => {
    const userRSVP = gathering.rsvp
      .find(data => data.username === username)
    if(userRSVP){
      switch(userRSVP.rsvp){
        case 'true':
          return 'true'
        case 'false':
          return 'false'
        default: 
          return 'undecided'
      }
    } 
  }


  return(
    <div id='rsvp-content' onChange={handleOnChange}>
      <div id='rsvp-name'>
        {data.username}:
      </div>
      <label className='thumbslabel'>
        <ThumbsUpOutlinedIcon 
          id='thumbIconUp'
          check={checked.up.toString()}
        />
        <input
          className='rsvpRadio'
          id='thumbsUp'
          type='radio'
          defaultChecked={getUserRSVPstatus(data.username) === 'true'}
          name={data.username} 
          value='true' 
        />
      </label>
      <label className='thumbslabel'>
        <div
        id='thumbIconNeutral'
        check={checked.neutral.toString()}
        ><div id='question'>?</div></div>
        <input
          className='rsvpRadio'
          type='radio'
          defaultChecked={getUserRSVPstatus(data.username) === 'undecided'}
          name={data.username}
          value='undecided'
        />
      </label>  
      <label className='thumbslabel'>
        <ThumbsDownOutlinedIcon
        id='thumbIconDown'
        check={checked.down.toString()}
        />
        <input
        className='rsvpRadio'
        id='thumbsDown'
        type='radio' 
        defaultChecked={getUserRSVPstatus(data.username) === 'false'} 
        name={data.username} 
        value='false'
        />
      </label>           
    </div>
  )
}

export default RSVPRadio
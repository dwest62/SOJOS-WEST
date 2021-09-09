import React, { useEffect, useState } from 'react'
import Toggable from './Toggable'
import { useSelector, useDispatch } from 'react-redux'
import { updateRSVP, addGuest } from '../reducers/gatheringReducer'
import RSVPList from './RSVPList'
import { Button } from '@material-ui/core'
import { convertFromRaw } from 'draft-js'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import EditIcon from '@material-ui/icons/Edit'

const Gathering = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const gathering = useSelector(state => state.gatherings)
  const user = useSelector(state => state.user).user
  const users = useSelector(state => state.users)

  /* Set gathering array number*/
  const number = gathering.length - 1

  const [ editor, setEditor ] = useState(() =>
  EditorState.createWithContent(
    convertFromRaw(JSON.parse(gathering[number].content)))
  )

  useEffect(() =>{
    setEditor(() => EditorState.createWithContent(
      convertFromRaw(JSON.parse(gathering[number].content))))
  },[gathering, number])
  
  const handleOnChange = (event) => {
    const member = event.target.name
    const person = users.find(data => data.username === member)
    const value = event.target.value
    dispatch(updateRSVP(gathering[number], value, person))
  }

  const family = users.filter(data => data.lastName === user.lastName)

  const getUserRSVPstatus = (username) => {
    const userRSVP = gathering[number].rsvp
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
    dispatch(addGuest(gathering[number], guest))
  }
  
  /********Convert date for display*************************** */
  const date = moment(gathering[number].date)
  const longEnUSFFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const dateString = longEnUSFFormatter.format(date)
  /********************************************************* */
  return(
      <div className='gatheringContent'>
        <h2 id='gatheringTitle'>
          House Church Gathering
          <EditIcon onClick= {() => history.push(`/update-gatherings/${gathering[number].id}`)}/>
        </h2>
        <div id='gatheringParagraph'>
          <p>
          <strong>Date:</strong> {dateString}
          </p>
          <p>
            <strong>Time:</strong> {' '}
            {
              moment(gathering[number].startTime, "HH:mm").format("hh:mm a")
            } - {' '}
            {
              moment(gathering[number].endTime, "HH:mm").format("hh:mm a")
            }
          </p>
          <div>
            <strong>Details for the evening:</strong> 
          </div>
            <Editor
              editorState={editor}
              onEditorStateChange={setEditor}
              readOnly={true}
              toolbarHidden={true}
            />
          <strong>RSVP:</strong>
          <div id='rsvp'>
            {family.map( 
              data =>
                <div id='rsvp-content' onChange={handleOnChange}>
                    {data.username}:<input 
                      type='radio'
                      defaultChecked={getUserRSVPstatus(data.username) === 'true'} 
                      name={data.username} 
                      value='true' 
                  /> yes
                    <input 
                      type='radio' 
                      defaultChecked={getUserRSVPstatus(data.username) === 'false'} 
                      name={data.username} 
                      value='false'
                    /> no
                    <input
                      type='radio'
                      defaultChecked={getUserRSVPstatus(data.username) === 'undecided'}
                      name={data.username}
                      value='undecided'
                    /> undecided
                </div>
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
          <Toggable id='rsvp-btn' buttonLabel="Who's in?" cancel='hide'>
            <RSVPList number={number}/>
          </Toggable> 
        </div>
      </div>
  )
}

export default Gathering
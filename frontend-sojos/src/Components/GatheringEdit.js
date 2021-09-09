import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { updateGathering } from '../reducers/gatheringReducer'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'draft-js/dist/Draft.css'


const GatheringEdit = ({gathering}) => {
  const history = useHistory()

  const [ editor, setEditor ] = useState(() =>
  EditorState.createWithContent(
    convertFromRaw(JSON.parse(gathering.content)))
  )
  useEffect(() =>{
    console.log(editor)
  }, [editor])

  const dispatch = useDispatch()

  const initialDate = moment(gathering.date).format("YYYY-MM-DD")
  
  const handleUpdateGathering = (event) => {
    event.preventDefault()
    const date = moment(event.target.date.value)
    const startTime = event.target.startTime.value
    const endTime = event.target.endTime.value
    const location = {
      street: event.target.street.value,
      city: event.target.city.value,
      state: event.target.state.value,
      postal: event.target.postal.value,
      country: event.target.country.value
    }
    const content = JSON.stringify(convertToRaw(editor.getCurrentContent()))
    const updatedGathering = {
      rsvp: gathering.rsvp,
      user: gathering.user,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      content: content
    }
    dispatch(updateGathering(gathering.id, updatedGathering))
    history.push('/')
  }

  /*const selectHost = (event) => {
    console.log(event.target.value,'event')
    //pre-install host home names.
  }*/
  
  return (
    <div>
      <Container>
        <form onSubmit={handleUpdateGathering}>
              <div className='input-wrapper'>
                <input 
                className='input-box'
                name='date'
                type='date'
                defaultValue={initialDate}
                readOnly={false}
              />
              </div>
              <div className='input-wrapper'>
                <input 
                  className='input-box'
                  name='startTime'
                  type='time'
                  defaultValue={gathering.startTime}
                  placeholder='start time'
                />
              </div>
              <div className='input-wrapper'>
                <input
                  className='input-box'
                  name='endTime'
                  type='time'
                  defaultValue={gathering.endTime}
                />
              </div>
              <div className='input-wrapper'>
                <input 
                  className='input-box'
                  name='street'
                  placeholder='2827 N Newton Ave'
                  defaultValue={gathering.location.street}
                />
              </div>
              <div className='input-wrapper'>
                <input
                  className='input-box'
                  name='city'
                  placeholder='Minneapolis'
                  defaultValue={gathering.location.city} 
                />
              </div>
              <div className='input-wrapper'>
                <input
                  className='input-box'
                  name='state'
                  placeholder='MN'
                  defaultValue={gathering.location.state} 
                />
              </div>
              <div className='input-wrapper'>
                <input
                  className='input-box'
                  name='postal'
                  placeholder='55411'
                  defaultValue={gathering.location.postal}
                />
              </div>
              <div className='input-wrapper'>
                <input
                  className='input-box'
                  name='country'
                  placeholder='USA'
                  defaultValue={gathering.location.country}
                />
              </div>
              <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                <Editor
                  editorState={editor}
                  onEditorStateChange={setEditor}
                />
              </div>
            <Button type='submit'>submit</Button>
            <Button onClick={() => history.push('/')}>cancel</Button>
          </form>
        </Container>
    </div>
  )
}

export default GatheringEdit
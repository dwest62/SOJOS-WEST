import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { createGathering } from '../reducers/gatheringReducer'
import { useSelector } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw } from 'draft-js'
import { useHistory } from 'react-router'
import moment from 'moment'


const GatheringForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const [ editor, setEditor ] = useState(() =>
  EditorState.createEmpty())

  useEffect(() => {
    console.log(editor)
  }, [editor])

  const user = useSelector(state => state.user).user

  const newGathering = (event) => {
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
    const newGathering = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      content: content
    }
    dispatch(createGathering(newGathering, user))
    history.push('/')
  }

  const selectHost = (event) => {
    console.log(event.target.value,'event')
    //pre-install host home names.
  }
  
  return (
    <div>
      <Container>
        <form onSubmit={newGathering}>
              <div className='input-wrapper'>
                <input className='input-box' name='date' placeholder='date' type='date'/>
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='startTime' type='time' placeholder='start time'/>
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='endTime' type='time' placeholder='start time'/>
              </div>
              <div className='input-wrapper'>
                <select className='input-box' id='hostHome' onChange={selectHost}>
                  <option>Wanggaards</option>
                  <option>Beacon of Hope</option>
                </select>
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='street' placeholder='2827 N Newton Ave, Minneapolis, MN 55411' />
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='city' placeholder='Minneapolis' />
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='state' placeholder='MN' />
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='postal' placeholder='55411' />
              </div>
              <div className='input-wrapper'>
                <input className='input-box' name='country' placeholder='USA' />
              </div>
              
              <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                <Editor
                  editorState={editor}
                  onEditorStateChange={setEditor}
                />
              </div>
            <Button type='submit'>submit</Button>
            <Button onClick={() => history.push('/')}> cancel</Button>
          </form>
        </Container>
    </div>
  )
}

export default GatheringForm
import React, { useEffect, useState } from 'react'
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
    }

    const content = JSON.stringify(convertToRaw(editor.getCurrentContent()))
    const newGathering = {
      postDate:moment(new Date()),
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      content: content
    }
    dispatch(createGathering(newGathering, user))
    history.push('/')
  }

  /* get next saturday functionality*/
    const nextSat =moment().weekday(6).format("YYYY-MM-DD")
  
  return (
    <div>
      <div>
        <form onSubmit={newGathering} className='newGath'>
          <div className='newGathWrapper'>
            <h1 className='newGatheringTitle'>
              Post Gathering
            </h1>
            When:
            <div className='newGathInputs'>
              <div className='input-wrapper2'>
                <input className='input-box2' name='date' placeholder='date' type='date' defaultValue={nextSat}/>
              </div>
              <div className='timewrap'>
                <div className='input-wrapper2'>
                  <input className='input-box3' name='startTime' type='time' placeholder='start time' defaultValue={'16:30'}/>
                </div>
                <div className='input-wrapper2'>
                  <input className='input-box3' name='endTime' type='time' placeholder='start time' defaultValue={'18:30'}/>
                </div>
              </div>
              
            </div>
          Where:
            <div className='newGathInputs'>
              <div className='input-wrapper2'>
                <input className='input-box2' name='street' placeholder='2827 N Newton Ave' />
              </div>
              <div className='input-wrapper2'>
                <input className='input-box2' name='city' placeholder='Minneapolis' />
              </div>
              <div className='input-wrapper2'>
                <input className='input-box2' name='state' placeholder='MN' />
              </div>
              <div className='input-wrapper2'>
                <input className='input-box2' name='postal' placeholder='55411' />
              </div>
            </div>
            Details:
              <div style={{ border: "1px solid black", padding: '2px', minHeight: '300px', marginTop: '20px'}}>
                <Editor
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'embedded', 'emoji', 'remove', 'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                  editorState={editor}
                  onEditorStateChange={setEditor}
                />
              </div>
                <div>
                  <Button type='submit'>submit</Button>
                  <Button onClick={() => history.push('/')}> cancel</Button>
                </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default GatheringForm
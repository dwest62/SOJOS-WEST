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
import emailService from '../services/email'



const GatheringForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const [ editor, setEditor ] = useState(() =>
  EditorState.createEmpty())
  const [ address, setAddress ] = useState({street:'', city:'', state:'', postal:''})

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
    console.log(emailService.alert, 'emailser')
    history.push('/')
  }

  const selectHost = (event) => {
    event.preventDefault()
    setAddress()
    const value = event.target.value
    switch(value){
      case "RiverPark":
        return( 
          setAddress({
            street:'230 83rd Ave N',
            city:'Brooklyn Park',
            state:'MN',
            postal:'55443'
          })
        )
      case "OrchardTrailPark":
        return( 
          setAddress({
            street:'10601 Oxbow Creek Drive N',
            city:'Brooklyn Park',
            state:'MN',
            postal:'55443'
          })
        )
      case "BeaconOfHope":
        return( 
          setAddress({
            street:'2827 N Newton Ave',
            city:'Minneapolis',
            state:'MN',
            postal:'55411'
          })
        )
      case "Wanggaard":
        return( 
          setAddress({
            street:"1921 Elliot Ave",
            city:'Minneapolis',
            state:'MN',
            postal:'55404'
          })
        )
      case "Gonsalves":
        return( 
          setAddress({
            street:"9135 Hyland Creek Road",
            city:'Bloomington',
            state:'MN',
            postal:'55437'
          })
        )
      case "Mathsen":
        return( 
          setAddress({
            street:"10336 Yates Drive N",
            city:'Brooklyn Park',
            state:'MN',
            postal:'55443'
          })
        )
      case "Fischer":
        return( 
          setAddress({
            street:"8656 Riverview Lane N",
            city:'Brooklyn Park',
            state:'MN',
            postal:'55444'
          })
        )
      case "Callaghan":
        return( 
          setAddress({
            street:"7940 Sunkist Blvd",
            city:'Brooklyn Park',
            state:'MN',
            postal:'55444'
          })
        )
      default: 
        return setAddress({street:'', city:'', state:'', postal:''})
    }
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
              <div className='input-wrapper2' id='addr-sel-wrapper'>
                <select className='addr-sel' onChange={selectHost}>
                  <option value="None">(None)</option>
                  <option value="RiverPark">River Park</option>
                  <option value="OrchardTrailPark">Orchard Trail Park</option>
                  <option value="BeaconOfHope">Beacon of Hope</option>
                  <option value="Wanggaard">Wanggaard's</option>
                  <option value="Gonsalves">Gonsalves'</option>
                  <option value="Mathsen">Mathsen's</option>
                  <option value="Fischer">Fischer's</option>
                  <option value="Callaghan">Callaghan's</option>
                </select>
              </div>
              <div className='input-wrapper2'>
                <input 
                  className='input-box2'
                  name='street'
                  placeholder='2827 N Newton Ave'
                  value={address.street}
                  onChange={(event) => setAddress({...address, street:event.target.value})}
                />
              </div>
              <div className='input-wrapper2'>
                <input
                  className='input-box2'
                  name='city'
                  placeholder='Minneapolis'
                  value={address.city}
                  onChange={(event) => setAddress({...address, city:event.target.value})}
                />
              </div>
              <div className='input-wrapper2'>
                <input
                  className='input-box2'
                  name='state'
                  placeholder='MN'
                  value={address.state}
                  onChange={(event) => setAddress({...address, state:event.target.value})}
                />
              </div>
              <div className='input-wrapper2'>
                <input
                  className='input-box2'
                  name='postal'
                  placeholder='55411'
                  value={address.postal}
                  onChange={(event) => setAddress({...address, postal:event.target.value})}
                />
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